package com.deforay.intelis.appupdate;

import android.app.Activity;

import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.appupdate.AppUpdateOptions;
import com.google.android.play.core.install.InstallStateUpdatedListener;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.InstallStatus;
import com.google.android.play.core.install.model.UpdateAvailability;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Google Play in-app updates. Works only for installs that came from Google Play; elsewhere
 * check() fails and the app falls back to its own "new version" notice.
 */
public class PlayAppUpdate extends CordovaPlugin {

    private AppUpdateManager manager;
    private InstallStateUpdatedListener listener;

    private AppUpdateManager manager() {
        if (manager == null) {
            manager = AppUpdateManagerFactory.create(cordova.getActivity().getApplicationContext());
        }
        return manager;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callback) {
        switch (action) {
            case "check": check(callback); return true;
            case "startFlexible": start(AppUpdateType.FLEXIBLE, callback); return true;
            case "startImmediate": start(AppUpdateType.IMMEDIATE, callback); return true;
            case "complete": complete(callback); return true;
            // Reattach to a flexible download started before the app was restarted.
            case "listen": listenForProgress(callback); return true;
            default: return false;
        }
    }

    private void check(CallbackContext callback) {
        manager().getAppUpdateInfo()
            .addOnSuccessListener(info -> {
                try {
                    JSONObject result = new JSONObject();
                    result.put("available", info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
                        || info.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS);
                    result.put("versionCode", info.availableVersionCode());
                    result.put("flexibleAllowed", info.isUpdateTypeAllowed(AppUpdateType.FLEXIBLE));
                    result.put("immediateAllowed", info.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE));
                    result.put("installStatus", statusName(info.installStatus()));
                    Integer staleness = info.clientVersionStalenessDays();
                    result.put("stalenessDays", staleness == null ? JSONObject.NULL : staleness);
                    callback.success(result);
                } catch (JSONException e) {
                    callback.error(e.getMessage());
                }
            })
            .addOnFailureListener(e -> callback.error(String.valueOf(e.getMessage())));
    }

    private void start(int type, CallbackContext callback) {
        Activity activity = cordova.getActivity();
        manager().getAppUpdateInfo()
            .addOnSuccessListener(info -> {
                if (!info.isUpdateTypeAllowed(type)) {
                    callback.error("update-not-allowed");
                    return;
                }
                if (type == AppUpdateType.FLEXIBLE) {
                    listenForProgress(callback);
                }
                manager().startUpdateFlow(info, activity, AppUpdateOptions.newBuilder(type).build())
                    .addOnSuccessListener(resultCode -> {
                        String status = resultCode == Activity.RESULT_OK ? "accepted" : "canceled";
                        send(callback, event(status, 0, 0), type == AppUpdateType.FLEXIBLE && resultCode == Activity.RESULT_OK);
                        if (resultCode != Activity.RESULT_OK) {
                            stopListening();
                        }
                    })
                    .addOnFailureListener(e -> {
                        stopListening();
                        callback.error(String.valueOf(e.getMessage()));
                    });
            })
            .addOnFailureListener(e -> callback.error(String.valueOf(e.getMessage())));
    }

    private void listenForProgress(CallbackContext callback) {
        stopListening();
        listener = state -> {
            int status = state.installStatus();
            boolean done = status == InstallStatus.DOWNLOADED || status == InstallStatus.INSTALLED
                || status == InstallStatus.FAILED || status == InstallStatus.CANCELED;
            send(callback, event(statusName(status), state.bytesDownloaded(), state.totalBytesToDownload()), !done);
            if (done) {
                stopListening();
            }
        };
        manager().registerListener(listener);
    }

    private void complete(CallbackContext callback) {
        manager().completeUpdate()
            .addOnSuccessListener(v -> callback.success())
            .addOnFailureListener(e -> callback.error(String.valueOf(e.getMessage())));
    }

    private void stopListening() {
        if (listener != null) {
            manager().unregisterListener(listener);
            listener = null;
        }
    }

    private static JSONObject event(String status, long bytes, long total) {
        JSONObject o = new JSONObject();
        try {
            o.put("status", status);
            o.put("bytes", bytes);
            o.put("total", total);
        } catch (JSONException ignored) {
        }
        return o;
    }

    private static void send(CallbackContext callback, JSONObject payload, boolean keep) {
        PluginResult result = new PluginResult(PluginResult.Status.OK, payload);
        result.setKeepCallback(keep);
        callback.sendPluginResult(result);
    }

    private static String statusName(int status) {
        switch (status) {
            case InstallStatus.PENDING: return "pending";
            case InstallStatus.DOWNLOADING: return "downloading";
            case InstallStatus.DOWNLOADED: return "downloaded";
            case InstallStatus.INSTALLING: return "installing";
            case InstallStatus.INSTALLED: return "installed";
            case InstallStatus.FAILED: return "failed";
            case InstallStatus.CANCELED: return "canceled";
            default: return "unknown";
        }
    }

    @Override
    public void onDestroy() {
        stopListening();
        super.onDestroy();
    }
}
