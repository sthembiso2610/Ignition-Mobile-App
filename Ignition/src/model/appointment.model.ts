import { Client } from './client.model';
import { Employee } from './employee.model';
import { ServiceItem } from './serviceItem.model';

export interface Appointment {
	id?: string;
	serviceItem?: string;
	location?: string;
	status?: string;
	type?: string;
	serviceID?: string;
	clientID?: string;
	reviewID?: string;
	empAvatar?: string;
	empName?: string;
	StartTime?: Date;
	EndTime?: Date;
	Subject?: string;
	empUid?: string;
	startSlot?: number;
	endSlot?: number;
	clientUid?: string;
	clientName?: string;
  clientAvatar?: string;
  description?: string
  client?: Client;
  instructor?: Employee;
  service?: ServiceItem;
}
