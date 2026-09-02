import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToastService, LoaderService } from '../../../../app/service/providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Events } from 'src/app/service/providers';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-mohdrc-select-patient-details',
  templateUrl: './mohdrc-select-patient-details.page.html',
  styleUrls: ['./mohdrc-select-patient-details.page.scss'],
})
export class MohdrcSelectPatientDetailsPage implements OnInit {
  search: string = ''; // Search string bound to the ion-searchbar
  matchedPatientsArray: any[] = [];
  patientSearchText: string = ''; // Initialize the patientSearchText
  results: any[] = []; // Store the results from the database

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
    // Check if there's any data in route params for initial search
    this.patientSearchText = this.actRoute.snapshot.params[''] || '';
  }

  ngOnInit() {
    // Call this method when the page is initialized
    this.initStorage();
  }

  async ionViewWillEnter() {
    await this.getCovid19Records();
    await this.storage.remove("selectedPatient"); // Clear previous selection
  }

  async initStorage() {
    // Initialize the storage for the first time
    await this.storage.create();
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

      // Call filterPatients to filter based on the initial search input
      this.filterPatients();
    } catch (error) {
      console.error('Error retrieving data from SQLite database:', error);
    }
  }

  filterPatients() {
    if (!this.patientSearchText) {
      // If no search text, display all records
      this.matchedPatientsArray = this.results;
      return;
    }

    let filteredRecords = this.results.filter(item => {
      return (item.patient_name && item.patient_name.toLowerCase().includes(this.patientSearchText.toLowerCase())) ||
             (item.patient_surname && item.patient_surname.toLowerCase().includes(this.patientSearchText.toLowerCase())) ||
             (item.patient_id && item.patient_id.toLowerCase().includes(this.patientSearchText.toLowerCase()));
    });

    this.matchedPatientsArray = filteredRecords;
    console.log('Matched Patients Array:', this.matchedPatientsArray.length);
  }

  async selectedPatient(item) {
    console.log('Selected Patient Item:', item); // Log the selected patient item
    await this.storage.set("selectedPatient", item);
    
    // Verify if the value was set correctly
    const savedItem = await this.storage.get("selectedPatient");
    console.log('Saved Patient Item:', savedItem); // Log what was saved
    
    setTimeout(() => {
      this.router.navigate(['mohdrc-add-new-request', { searchText: this.patientSearchText }]);
    }, 800);
  }

  close() {
    this.router.navigate(['mohdrc-add-new-request'], { replaceUrl: true });
  }
}
