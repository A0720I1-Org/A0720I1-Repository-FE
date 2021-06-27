
import { IAccount } from './IAccount';
import { IReportCard } from './IReportCard';
export interface IStudent {
  id: number;
  name : string ;
  birthday : string ;
  gender : string ;
  hometown : string ;
  ethnicity : string ;
  religion : string ;
  imageUrl : string ;
  email : string ;
  reportCardList : IReportCard[] ;
  account : IAccount ;
}
