import { Speciality, Hospital, HospitalsData, Position, Profile } from '../hospitals/hospitals.model';
import { fetchTravelTimes } from './fetching.ORS';
import { LatLng } from './fetching.ORS.model';

async function listHostpitals(): Promise<HospitalsData> {
    const data = await fetch(String(process.env.PREDICTIF_EMERGENCY_DEPTS));
    const json = await data.json();
    let hospitals: HospitalsData = {
        hospitals: [],
    };

    for (let hp of json.objects) {
        let pos: Position = {
            latitude: hp.latitude,
            longitude: hp.longitude
        };

        let hospital: Hospital = {
            id: hp.id,
            name: hp.name,
            position: pos,
            address: hp.address,
            speciality: hp.speciality as Speciality,
            public: Boolean(hp.type),
            currentWaitTime: 0,
            nextWaitTime: 0,
            travelTime: 0,
        };

        hospitals.hospitals.push(hospital);
    }
    return hospitals;
}

async function getHostpitalsTime(hpList: HospitalsData, hpIds: Array<number>): Promise<HospitalsData> {
    let ids = [];
    for (let i of hpIds) {
        let hp = hpList.hospitals[i];
        ids.push(hp.id);
    }

    let f = await fetch(String(process.env.PREDICTIF_EMERGENCY_INFLUXES) + ids.toString());
    let data = await f.json();

    for (let i = 0; i < ids.length; i++) {
        let index = hpIds[i];
        let fetchedData = data.objects[i];

        hpList.hospitals[index].currentWaitTime = fetchedData.estimated[2];
        hpList.hospitals[index].nextWaitTime = fetchedData.estimated[3];
    }

    return hpList;
}

export default async function fetchHospitalsData(myPosition: LatLng, profile: Profile = Profile.vehiculePersonnel): Promise<HospitalsData> {
    let hospitals = await listHostpitals();
    let ids = [];
    for (let i = 0; i < hospitals.hospitals.length; i++) {
        ids.push(i);
    }
    hospitals = await getHostpitalsTime(hospitals, ids);
    // Add travel times to each hospital
    const positions = hospitals.hospitals.map(hp => hp.position);
    const travelTimes = await fetchTravelTimes(myPosition, positions, profile);
    for (let i = 0; i < hospitals.hospitals.length; i++) {
        hospitals.hospitals[i].travelTime = (travelTimes && travelTimes[i]) || 0;
    }
    return hospitals;
}