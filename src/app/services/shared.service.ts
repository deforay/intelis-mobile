import { Injectable } from '@angular/core';
import { CommonService } from '../service/common/common.service';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public districtdata:any;
  labResultPanelForm: FormGroup;
  maxSampleCollectionDate:any;
  childInfoPanelForm: FormGroup;
  childMotherDetailsPanelForm: FormGroup;
  private initArray = { labTechniciansList: [],resultsList: [],pcrTestReason: [],testingLabsList: [] };


  constructor(private commonService: CommonService) { }

  async onChangePOEState($event, provinceListArray) {
    const selectedProvince = $event.option.value;
    const selectedCounty = provinceListArray.find(item => item.province_name === selectedProvince);
    
    if (!selectedCounty) {
      throw new Error('Selected province not found');
    }

    const POECountyDupArray = await this.commonService.getDistrictList(selectedCounty.province_id);
    const POECountyArray = [...new Set(POECountyDupArray.map(({ district_id }) => district_id))]
                            .map(e => POECountyDupArray.find(({ district_id }) => district_id === e));
    console.log(POECountyArray)

    return POECountyArray;
  }

  async onChangePOECounty($event, POECountyArray) {
    const selectedCounty = POECountyArray.find(item => item.district_name === $event.option.value);
    if (!selectedCounty) {
      throw new Error('Selected county not found');
    }
    const { district_name, district_id } = selectedCounty; // Destructure district_name and district_id
    const POEArray = await this.commonService.getFacilitiesList(district_id);
    return { POEArray, district_id };
  }
  
  

  /* DRC for VL */
  calculateAge(patientInfoPanelForm: FormGroup) {
    const dob = new Date(patientInfoPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - dob.getTime());
    const ageInYears = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    patientInfoPanelForm.get('ageInYears').setValue(ageInYears);
    console.log(ageInYears, 'ageInYears');
    
    if (ageInYears < 1) {
      const ageInMonths = Math.floor((timeDiff / (1000 * 3600 * 24)) / 30);
      patientInfoPanelForm.get('ageInMonths').setValue(ageInMonths);
    }

    const maxSampleCollectionDate = dob;
    const month = this.formatDate(maxSampleCollectionDate.getMonth() + 1);
    const day = this.formatDate(maxSampleCollectionDate.getDate());
    const formattedDate = `${maxSampleCollectionDate.getFullYear()}-${month}-${day}T00:00`;
    console.log(formattedDate, 'maxSampleCollectionDate');

    return formattedDate;
  }

  /* South Sudan for VL */
  calculateAged(clinicInfoPanelForm: FormGroup) {
    const convertAge = new Date(clinicInfoPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    clinicInfoPanelForm.get('age').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));
  
    let maxSampleCollectionDate = convertAge;
    const month = this.formatDate(maxSampleCollectionDate.getMonth() + 1);
    const day = this.formatDate(maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(maxSampleCollectionDate, 'maxSampleCollectionDate');
  }

  /* DRC and South Sudan for EID */
calculateEidAged(childMotherDetailsPanelForm: FormGroup) {
  const convertAge = new Date(childMotherDetailsPanelForm.controls.dob.value);
  const timeDiff = Math.abs(Date.now() - convertAge.getTime());
  childMotherDetailsPanelForm.get('age').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));

  let maxSampleCollectionDate = convertAge;
  const month = this.formatDate(maxSampleCollectionDate.getMonth() + 1);
  const day = this.formatDate(maxSampleCollectionDate.getDate());
  this.maxSampleCollectionDate = maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  console.log(maxSampleCollectionDate, 'maxSampleCollectionDate');
}

 

  onChangeRejectReason(vlInitArray: any, labResultPanelForm: any) {
    for (var i = 0; i < vlInitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = vlInitArray['rejectedReasonList'][i].reasons.filter(item =>
        item.show == labResultPanelForm.controls.rejectionReason.value);
      if (filteredRejectionReason.length > 0) {
        const rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        const rejectionReason = labResultPanelForm.controls.rejectionReason.value;
        console.log(filteredRejectionReason, 'filteredRejectionReason', rejectionReasonId, rejectionReason);
        return { rejectionReasonId, rejectionReason };
      }
    }
    return { rejectionReasonId: '', rejectionReason: '' }; // Return default values if no match found
  }

  /* DRC and South Sudan for EID */
  clearSampleReceived() {
    this.labResultPanelForm.get('sampleReceivedDateTime').setValue('');
  }

  /* DRC and South Sudan for EID */
  clearSampleCollection() {
    this.childInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  }

  /* DRC and South Sudan for VL */
  clearReviewedByOn() {
    this.labResultPanelForm.get('reviewedOn').setValue('');
  }


  /* DRC and South Sudan for EID */
  clearDOB() {
    this.childMotherDetailsPanelForm.get('dob').setValue('');
  }

 
  private formatDate(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
