// import { AppInfo } from 'src/model';
// import { Appointment } from 'src/model/appointment.model';
// import { Client } from 'src/model/client.model';
// import { ClientLicenceRecord } from 'src/model/clientLicenceRecord.model';
// import { Company } from 'src/model/company.model';
// import { Employee } from 'src/model/employee.model';
// import { LicenceCode } from 'src/model/LicenceCode.model';
// import { IGNPackage } from 'src/model/package.model';
// import { IGNTransaction } from 'src/model/transaction.model';
// import { IGNUser } from 'src/model/user.model';
// import { Vehicle } from 'src/model/vehicle.model';
// import { State, Action, StateContext, Selector, Store, Select } from '@ngxs/store';
// import { Injectable } from '@angular/core';

// export interface StateModel {


//     user?: IGNUser;
// 	company?: Company;
// 	licencerecord?: ClientLicenceRecord;
// 	employee?: Employee;
// 	appInfo?: AppInfo;
// 	clients?: Client[];
// 	employees?: Employee[];
// 	licenceCodes?: LicenceCode[];
// 	packages?: IGNPackage[];
// 	appointments?: Appointment[];
//   transactions?: IGNTransaction[];
//   Vehicle?: Vehicle[];
// }

// @State<StateModel>({
// 	name: 'app',
// 	defaults: {
// 		appointments: [],
// 		transactions: [],
// 		appInfo: {
// 			genderOptions: [],
// 			workingHours: []
// 		},
// 		user: {
// 			name: ''
// 		},
// 		licencerecord: {
// 			id: ''
// 		},
// 		employee: {},
// 		company: {
// 			name: '',
// 			vehicles: [],
// 			serviceItems: [],
// 			empTypes: [],
// 			actionPlanItems: []
// 		},
// 		clients: [],
// 		employees: [],
// 		licenceCodes: [],
// 		packages: []
// 	}
// })
// @Injectable()
// export class AppState {
// 	constructor(private afStore: AngularFirestore, private store: Store) {
// 		this.afStore.doc(`utility/vsvPfmxhNa5AwlzVnGIu`).snapshotChanges().subscribe((snap) => {
// 			const data: any = snap.payload.data();
// 			this.store.dispatch(
// 				new SetAppInfo({
// 					...data,
// 					genderOptions: data['genders']
// 				})
// 			);
// 		});
// 	}

// 	@Selector()
// 	static userTransactions(state: StateModel) {
// 		return (id: string) => {
// 			return state.transactions.filter((el) => el.id == id);
// 		};
// 	}

// 	@Selector()
// 	static empType(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.company.empTypes.findIndex((e) => e.id === id);
// 			return index === -1 ? { name: '' } : state.company.empTypes[index];
// 		};
// 	}

// 	@Selector()
// 	static serviceitem(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.company.serviceItems.findIndex((e) => e.id === id);
// 			return index === -1 ? { name: '' } : state.company.serviceItems[index];
// 		};
// 	}

// 	@Selector()
// 	static planitem(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.company.actionPlanItems.findIndex((e) => e.id === id);
// 			return index === -1 ? { name: '' } : state.company.actionPlanItems[index];
// 		};
// 	}

// 	@Selector()
// 	static licenceCode(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.licenceCodes.findIndex((e) => e.id === id);
// 			return index === -1 ? { name: '' } : state.licenceCodes[index];
// 		};
// 	}

// 	@Selector()
// 	static package(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.packages.findIndex((e) => e.id === id);
// 			return index === -1 ? { name: '' } : state.packages[index];
// 		};
// 	}

// 	@Selector()
// 	static employee(state: StateModel) {
// 		return (id: string) => {
// 			const index = state.employees.findIndex((e) => e.uid == id);
// 			return index == -1 ? { name: '' } : state.employees[index];
// 		};
// 	}

// 	@Selector()
// 	static empAppointments(state: StateModel): ServiceItem[] {
// 		return state.appointments.filter((el) => {
// 			el.empUid == state.user.uid;
// 		});
// 	}

// 	@Selector()
// 	static myAppointments(state: StateModel): ServiceItem[] {
// 		return state.appointments.filter((el) => {
// 			el.clientUid == state.user.uid;
// 		});
// 	}

// 	@Selector()
// 	static myTransactions(state: StateModel): ServiceItem[] {
// 		return state.transactions.filter((e) => e.id != state.user.uid);
// 	}

// 	@Selector()
// 	static serviceItems(state: StateModel): ServiceItem[] {
// 		return state.company.serviceItems;
// 	}

// 	@Selector()
// 	static instructors(state: StateModel): ServiceItem[] {
// 		return state.employees.filter((e) => e.empType == '1');
// 	}

// 	@Selector()
// 	static walletBalance(state: StateModel): number {
// 		return state.transactions.filter((e) => e.id == state.user.uid).reduce((prev, current, index) => {
// 			if (current.type == 1) {
// 				return prev + current.amount;
// 			} else {
// 				return prev - current.amount;
// 			}
// 		}, 0);
// 	}

// 	@Selector()
// 	static vehicles(state: StateModel): Vehicle[] {
// 		return state.company.vehicles;
// 	}

// 	@Selector()
// 	static myPackages(state: StateModel): ServiceItem[] {
// 		return state.user.packages || [];
// 	}

// 	@Selector()
// 	static appointments(state: StateModel): ServiceItem[] {
// 		return state.appointments || [];
// 	}

// 	@Selector()
// 	static actionPlanItems(state: StateModel): ActionPlanItem[] {
// 		return state.company.actionPlanItems;
// 	}

// 	@Selector()
// 	static packages(state: StateModel): ServiceItem[] {
// 		return state.packages;
// 	}

// 	@Selector()
// 	static appInfo(state: StateModel): AppInfo {
// 		return state.appInfo;
// 	}

// 	@Selector()
// 	static user(state: StateModel): IGNUser {
// 		return state.user;
// 	}

// 	@Selector()
// 	static licencerecord(state: StateModel): ClientLicenceRecord {
// 		return state.licencerecord;
// 	}

// 	@Selector()
// 	static company(state: StateModel): Company {
//     return state.company;

//   }

//   @Selector()
//   static vehicle(state: StateModel){
//     return state.Vehicle;
//   }

// 	@Selector()
// 	static clients(state: StateModel) {
// 		return state.clients;
// 	}

// 	@Selector()
// 	static employees(state: StateModel) {
// 		return state.employees;
// 	}

// 	@Selector()
// 	static licenceCodes(state: StateModel) {
// 		return state.licenceCodes;
// 	}

// 	@Action(SetUser)
// 	setUser({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetUser) {
// 		patchState({
// 			user: payload
// 		});
// 	}

// 	@Action(SetLicenceRecord)
// 	setLicenceRecord({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetLicenceRecord) {
// 		patchState({
// 			licencerecord: payload
// 		});
// 	}

// 	@Action(SetCompany)
// 	setCompany({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetCompany) {
// 		payload.empTypes = payload.empTypes.sort((a, b) => Number(a.id) - Number(b.id));
// 		payload.serviceItems = payload.serviceItems || [];
// 		payload.actionPlanItems = payload.actionPlanItems || [];
// 		payload.serviceItems = payload.serviceItems.map((item) => {
// 			return {
// 				...item,
// 				quantity: item.quantity || 0
// 			};
// 		});
// 		patchState({
// 			company: payload
// 		});
// 	}

// 	@Action(SetAppInfo)
// 	setAppInfo({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetAppInfo) {
// 		patchState({
// 			appInfo: payload
// 		});
// 	}

// 	@Action(SetClients)
// 	setClients({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetClients) {
// 		console.log('setting clients', payload);
// 		patchState({
// 			clients: payload
// 		});
// 	}

// 	@Action(SetEmployees)
// 	setEmployees({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetEmployees) {
// 		patchState({
// 			employees: payload
// 		});
// 	}

// 	@Action(SetTransactions)
// 	setTransactions({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetTransactions) {
// 		patchState({
// 			transactions: payload
// 		});
// 	}

// 	@Action(SetAppointments)
// 	setAppointments({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetAppointments) {
// 		patchState({
// 			appointments: payload
// 		});
// 	}

// 	@Action(SetLicenceCodes)
// 	setLicenceCodes({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetLicenceCodes) {
// 		patchState({
// 			licenceCodes: payload
// 		});
// 	}

// 	@Action(SetPackages)
// 	setPackages({ patchState, setState, getState }: StateContext<StateModel>, { payload }: SetPackages) {
// 		patchState({
// 			packages: payload
// 		});
// 	}

// 	@Action(Initiate)
// 	initiate({ patchState, setState, getState }: StateContext<StateModel>, { payload }: Initiate) {
// 		this.fetchData(payload);
// 	}

// 	fetchData(user: IGNUser) {
// 		// get company record
// 		this.afStore.doc(`companies/${user.companyID}`).snapshotChanges().subscribe((snap) => {
// 			if (snap.payload.exists) {
// 				this.store.dispatch(
// 					new SetCompany({
// 						...snap.payload.data() as Object,
// 						id: snap.payload.id
// 					})
// 				);
// 			}
// 		});

// 		// get global transactions
// 		firestore().collection(`companies/${user.companyID}/transactions`).onSnapshot((data) => {
// 			this.store.dispatch(
// 				new SetTransactions(
// 					data.docs.map((el) => {
// 						return {
// 							...el.data(),
// 							id: el.id
// 						};
// 					})
// 				)
// 			);
// 		});

// 		// ! get appointments
// 		firestore().collection(`companies/${user.companyID}/appointments`).onSnapshot((data) => {
// 			this.store.dispatch(
// 				new SetAppointments(
// 					data.docs.map((el) => {
// 						return {
// 							...el.data(),
// 							StartTime: el.data().StartTime.toDate(),
// 							EndTime: el.data().EndTime.toDate(),
// 							id: el.id
// 						};
// 					})
// 				)
// 			);
// 		});

// 		// get client data
// 		if (user.userType == 0) {
// 			firestore()
// 				.doc(`users/${user.uid}`)
// 				.collection('records')
// 				.where('active', '==', true)
// 				.onSnapshot((snap) => {
// 					if (snap.docs.length > 0) {
// 						this.store.dispatch(
// 							new SetLicenceRecord({
// 								...snap.docs[0].data(),
// 								id: snap.docs[0].id
// 							})
// 						);
// 					}
// 				});

// 			// ! get my transactions
// 			firestore()
// 				.collection(`companies/${user.companyID}/transactions`)
// 				.where('clientUid', '==', user.uid)
// 				.onSnapshot((data) => {
// 					this.store.dispatch(
// 						new SetmyTransactions(
// 							data.docs.map((el) => {
// 								return {
// 									...el.data(),
// 									id: el.id
// 								};
// 							})
// 						)
// 					);
// 				});

// 			// ! get appointments
// 		} else {
// 			// get employee data
// 			firestore()
// 				.collection('users')
// 				.where('companyID', '==', user.companyID)
// 				.where('userType', '==', 1)
// 				.onSnapshot((snap) => {
// 					this.store.dispatch(
// 						new SetEmployees(
// 							snap.docs
// 								.filter((el) => {
// 									return el.id != user.companyID;
// 								})
// 								.map((e) => {
// 									return {
// 										...e.data(),
// 										uid: e.id
// 									};
// 								})
// 						)
// 					);
// 				});

// 			// get clients
// 			firestore()
// 				.collection('users')
// 				.where('companyID', '==', user.companyID)
// 				.where('userType', '==', 0)
// 				.onSnapshot((snap) => {
// 					this.store.dispatch(
// 						new SetClients(
// 							snap.docs
// 								.filter((el) => {
// 									return el.id != user.companyID;
// 								})
// 								.map((e) => {
// 									return {
// 										...e.data(),
// 										uid: e.id
// 									};
// 								})
// 						)
// 					);
// 				});
// 		}

// 		this.afStore.doc(`users/${user.uid}`).snapshotChanges().subscribe((snap) => {
// 			this.store.dispatch(
// 				new SetUser({
// 					uid: snap.payload.id,
// 					...snap.payload.data() as Object
// 				})
// 			);
// 		});

// 		// get licence codes
// 		this.afStore.collection(`companies/${user.companyID}/licencecodes`).snapshotChanges().subscribe((data) => {
// 			this.store.dispatch(
// 				new SetLicenceCodes(
// 					data.map((e) => {
// 						let data: any = e.payload.doc.data();
// 						return { ...data, id: e.payload.doc.id };
// 					})
// 				)
// 			);
// 		});

// 		// get service items
// 		this.afStore.collection(`companies/${user.companyID}/packages`).snapshotChanges().subscribe((data) => {
// 			this.store.dispatch(
// 				new SetPackages(
// 					data.map((e) => {
// 						let data: any = e.payload.doc.data();
// 						return { ...data, id: e.payload.doc.id };
// 					})
// 				)
// 			);
// 		});
// 	}
// }

