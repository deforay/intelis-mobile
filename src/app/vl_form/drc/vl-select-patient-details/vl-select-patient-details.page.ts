import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService, LoaderService } from '../../../../app/service/providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Events } from 'src/app/service/providers';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
    selector: 'app-vl-select-patient-details',
    templateUrl: './vl-select-patient-details.page.html',
    styleUrls: ['./vl-select-patient-details.page.scss'],
    standalone: false
})
export class VlSelectPatientDetailsPage implements OnInit {
  search: string = ''; // Search string bound to the ion-searchbar
  matchedPatientsArray: any[] = [];
  patientSearchText: string = ''; // Initialize the patientSearchText
  results: any[] = [];
  userID: any;

  constructor(
    private router: Router,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    public loadingController: LoadingController,
    public sql: SQLite, 
    public events: Events
  ) {
    this.patientSearchText = this.actRoute.snapshot.params[''] || '';
  }

  async ionViewWillEnter() {
    await this.storage.create(); // Ensure storage is initialized
    await this.getCovid19Records();
    await this.storage.remove("selectedPatient"); // Clear previous selection

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {

        this.userID = loginDetails['user'].user_id;
        console.log(this.userID)
       
      }
    })
  }

  async getCovid19Records() {
    try {
      const db: SQLiteObject = await this.sql.create({
        name: 'vlsm_mobile.db',
        location: 'default',
      });

      const data = await db.executeSql('SELECT * FROM form_covid19', []);
      this.results = [];

      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        this.results.push(item);
      }

      console.log('Results from SQLite:', this.results);

      // Filter records based on the initial search text
      this.filterPatients();
    } catch (error) {
      console.error('Error retrieving data from SQLite database:', error);
    }
  }

  filterPatients() {
    if (!this.patientSearchText) {
      this.matchedPatientsArray = this.results;
      return;
    }

    let filteredRecords = this.results.filter(item => {
      return (item.patient_name && item.patient_name.toLowerCase().includes(this.patientSearchText.toLowerCase())) ||
             (item.patient_surname && item.patient_surname.toLowerCase().includes(this.patientSearchText.toLowerCase())) ||
             (item.patient_art_no && item.patient_art_no.toLowerCase().includes(this.patientSearchText.toLowerCase()));
    });

    this.matchedPatientsArray = filteredRecords;
    console.log('Matched Patients Array:', this.matchedPatientsArray.length);
  }

  ngOnInit() {}

  async selectedPatient(item) {
    console.log('Selected Patient Item:', item); // Log the selected patient item
    await this.storage.set("selectedPatient", item);
    
    // Verify if the value was set correctly
    const savedItem = await this.storage.get("selectedPatient");
    console.log('Saved Patient Item:', savedItem); // Log what was saved
    
    setTimeout(() => {
      this.router.navigate(['new-vl-drc', { searchText: this.patientSearchText }]);
    }, 800);
  }

  close() {
    this.router.navigate(['new-vl-drc'], { replaceUrl: true });
  }
}
