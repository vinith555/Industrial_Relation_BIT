import { Injectable } from '@angular/core';
import { Visitor } from './detailInterface';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeronDetailService {

  private apiUrl = 'http://localhost:3000/profiledetails'; 
  
  
  // personDetail:Visitor[]=[
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/1.jpg',
  //     name: 'John Doe',
  //     email: 'john.doe@company.com',
  //     domain: 'Mechanical Engineering',
  //     visitedDate: '2023-11-12',
  //     companyName: 'Tech Dynamics',
  //     phoneNumber: 9876543210,
  //     Detail: 'Experienced in advanced mechanical systems and product development.',
  //     linkedIn: 'https://www.linkedin.com/in/johndoe'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/2.jpg',
  //     name: 'Jane Smith',
  //     email: 'jane.smith@corporation.com',
  //     domain: 'Electrical Engineering',
  //     visitedDate: '2023-10-04',
  //     companyName: 'Power Solutions Inc.',
  //     phoneNumber: 9876543211,
  //     Detail: 'Specialist in electrical power systems and grid solutions.',
  //     linkedIn: 'https://www.linkedin.com/in/janesmith'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/3.jpg',
  //     name: 'David Johnson',
  //     email: 'david.johnson@industrycorp.com',
  //     domain: 'Computer Science',
  //     visitedDate: '2023-09-15',
  //     companyName: 'InnovateTech',
  //     phoneNumber: 9876543212,
  //     Detail: 'Software engineer with expertise in AI and machine learning.',
  //     linkedIn: 'https://www.linkedin.com/in/davidjohnson'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/4.jpg',
  //     name: 'Emily Davis',
  //     email: 'emily.davis@globalenterprises.com',
  //     domain: 'Chemical Engineering',
  //     visitedDate: '2023-12-01',
  //     companyName: 'Global Enterprises',
  //     phoneNumber: 9876543213,
  //     Detail: 'Chemical engineer focused on sustainable materials and processes.',
  //     linkedIn: 'https://www.linkedin.com/in/emilydavis'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/5.jpg',
  //     name: 'Michael Brown',
  //     email: 'michael.brown@techworld.com',
  //     domain: 'Electrical Engineering',
  //     visitedDate: '2024-01-10',
  //     companyName: 'Tech World',
  //     phoneNumber: 9876543214,
  //     Detail: 'Expert in circuit design and electrical system integration.',
  //     linkedIn: 'https://www.linkedin.com/in/michaelbrown'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/6.jpg',
  //     name: 'Olivia Wilson',
  //     email: 'olivia.wilson@globaltech.com',
  //     domain: 'Electronics Engineering',
  //     visitedDate: '2023-07-18',
  //     companyName: 'GlobalTech Innovations',
  //     phoneNumber: 9876543215,
  //     Detail: 'Innovator in embedded systems and consumer electronics.',
  //     linkedIn: 'https://www.linkedin.com/in/oliviawilson'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/7.jpg',
  //     name: 'James Anderson',
  //     email: 'james.anderson@futureindustry.com',
  //     domain: 'Automotive Engineering',
  //     visitedDate: '2023-08-22',
  //     companyName: 'Future Industry Co.',
  //     phoneNumber: 9876543216,
  //     Detail: 'Automotive engineer specializing in EV technologies.',
  //     linkedIn: 'https://www.linkedin.com/in/jamesanderson'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/8.jpg',
  //     name: 'Sophia Martinez',
  //     email: 'sophia.martinez@autotech.com',
  //     domain: 'Civil Engineering',
  //     visitedDate: '2023-05-06',
  //     companyName: 'AutoTech Systems',
  //     phoneNumber: 9876543217,
  //     Detail: 'Civil engineer with expertise in infrastructure and urban development.',
  //     linkedIn: 'https://www.linkedin.com/in/sophiamartinez'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/9.jpg',
  //     name: 'William Garcia',
  //     email: 'william.garcia@innovations.com',
  //     domain: 'Electrical Engineering',
  //     visitedDate: '2023-03-30',
  //     companyName: 'SkyHigh Innovations',
  //     phoneNumber: 9876543218,
  //     Detail: 'Pioneer in renewable energy systems and smart grids.',
  //     linkedIn: 'https://www.linkedin.com/in/williamgarcia'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/10.jpg',
  //     name: 'Ava Robinson',
  //     email: 'ava.robinson@greentech.com',
  //     domain: 'Electrical Engineering',
  //     visitedDate: '2023-11-22',
  //     companyName: 'GreenTech Solutions',
  //     phoneNumber: 9876543219,
  //     Detail: 'Leader in green energy technologies and sustainable power.',
  //     linkedIn: 'https://www.linkedin.com/in/avarobinson'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/11.jpg',
  //     name: 'Ethan Scott',
  //     email: 'ethan.scott@nextgen.com',
  //     domain: 'Robotics Engineering',
  //     visitedDate: '2024-02-11',
  //     companyName: 'NextGen Robotics',
  //     phoneNumber: 9876543220,
  //     Detail: 'Robotics engineer advancing automation and AI-driven systems.',
  //     linkedIn: 'https://www.linkedin.com/in/ethanscott'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/12.jpg',
  //     name: 'Mia Walker',
  //     email: 'mia.walker@cybercorp.com',
  //     domain: 'Electrical Engineering',
  //     visitedDate: '2023-10-15',
  //     companyName: 'CyberCorp Security',
  //     phoneNumber: 9876543221,
  //     Detail: 'Security-focused electrical engineer with cyber protection expertise.',
  //     linkedIn: 'https://www.linkedin.com/in/miawalker'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/13.jpg',
  //     name: 'Alexander Harris',
  //     email: 'alexander.harris@futuretech.com',
  //     domain: 'Software Engineering',
  //     visitedDate: '2023-09-25',
  //     companyName: 'FutureTech Innovators',
  //     phoneNumber: 9876543222,
  //     Detail: 'Software engineer pushing the boundaries of cloud technologies.',
  //     linkedIn: 'https://www.linkedin.com/in/alexanderharris'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/14.jpg',
  //     name: 'Isabella Clark',
  //     email: 'isabella.clark@biotech.com',
  //     domain: 'Biotechnology',
  //     visitedDate: '2023-08-10',
  //     companyName: 'BioTech Research',
  //     phoneNumber: 9876543223,
  //     Detail: 'Researcher in genetic engineering and molecular biology.',
  //     linkedIn: 'https://www.linkedin.com/in/isabellaclark'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/15.jpg',
  //     name: 'Lucas Lewis',
  //     email: 'lucas.lewis@ai-solutions.com',
  //     domain: 'Artificial Intelligence',
  //     visitedDate: '2023-07-05',
  //     companyName: 'AI Solutions Ltd.',
  //     phoneNumber: 9876543224,
  //     Detail: 'AI expert with focus on machine learning and automation.',
  //     linkedIn: 'https://www.linkedin.com/in/lucaslewis'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/16.jpg',
  //     name: 'Amelia Young',
  //     email: 'amelia.young@newwave.com',
  //     domain: 'Marine Engineering',
  //     visitedDate: '2023-06-01',
  //     companyName: 'New Wave Technologies',
  //     phoneNumber: 9876543225,
  //     Detail: 'Marine engineer specializing in renewable ocean energy technologies.',
  //     linkedIn: 'https://www.linkedin.com/in/ameliayoung'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/17.jpg',
  //     name: 'Henry King',
  //     email: 'henry.king@opticsco.com',
  //     domain: 'Optical Engineering',
  //     visitedDate: '2024-01-22',
  //     companyName: 'OpticsCo Innovations',
  //     phoneNumber: 9876543226,
  //     Detail: 'Leader in optical technologies and photonics systems.',
  //     linkedIn: 'https://www.linkedin.com/in/henryking'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/18.jpg',
  //     name: 'Emily Green',
  //     email: 'emily.green@nanotech.com',
  //     domain: 'Nanotechnology',
  //     visitedDate: '2023-12-15',
  //     companyName: 'NanoTech Ventures',
  //     phoneNumber: 9876543227,
  //     Detail: 'Innovator in nanoscale materials and applications.',
  //     linkedIn: 'https://www.linkedin.com/in/emilygreen'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/men/19.jpg',
  //     name: 'Benjamin Turner',
  //     email: 'benjamin.turner@energycorp.com',
  //     domain: 'Renewable Energy',
  //     visitedDate: '2023-04-18',
  //     companyName: 'EnergyCorp',
  //     phoneNumber: 9876543228,
  //     Detail: 'Renewable energy engineer driving solar and wind power innovations.',
  //     linkedIn: 'https://www.linkedin.com/in/benjaminturner'
  //   },
  //   {
  //     img: 'https://randomuser.me/api/portraits/women/20.jpg',
  //     name: 'Charlotte Hill',
  //     email: 'charlotte.hill@transporttech.com',
  //     domain: 'Transportation Engineering',
  //     visitedDate: '2024-11-30',
  //     companyName: 'TransportTech Ltd.',
  //     phoneNumber: 9876543229,
  //     Detail: 'Expert in transportation systems and smart mobility solutions.',
  //     linkedIn: 'https://www.linkedin.com/in/charlottehill'
  //   }

  // ]
  
  
  constructor(private http: HttpClient) {}

  // getDetails(): Visitor[] {
  //   return this.personDetail;
  // }
  // addVisitor(visitor: Visitor): void {
  //   this.personDetail.push(visitor);
  // }
  // updateVisitor(index: number, updatedVisitor: Visitor): void {
  //   if (index >= 0 && index < this.personDetail.length) {
  //     this.personDetail[index] = updatedVisitor;
  //   }
  // }
  // deleteVisitor(index: number): void {
  //   if (index >= 0 && index < this.personDetail.length) {
  //     this.personDetail.splice(index, 1);
  //   }
  // }

  getDet(): Observable<Visitor[]> {
    return this.http.get<Visitor[]>(this.apiUrl);
  }
  
  addVisi(visitor: Visitor): Observable<Visitor> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Visitor>(this.apiUrl, visitor, { headers });
  }

  updateVisi(visitor: Visitor, id: string): Observable<Visitor> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.put<Visitor>(url, visitor); 
  }

}
