import { Injectable } from '@angular/core';
import { Requests } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }

  private _request: Requests[] = [
    {
      id: 'r1',
      item_name: 'Chocolate Brownie',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '1',
      itemImageUrl:
        'https://www.chelsea.co.nz/files/cache/c7eb8909bcbfb9ff878c499feb1dcbd5_f1433.jpg',
      username: 'Cecilia K.',
      location: 'Jakarta Selatan',
      avatar: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2019/entertainment/07/18/20190718-jane-deleon.jpg?ext=.jpg',
      isApprove: true
    },
    {
      id: 'p2',
      item_name: 'Golden Potatoes',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '2',
      itemImageUrl:
        'https://www.foxandbriar.com/wp-content/uploads/2016/03/Rosemary-Garlic-Potatoes-4-of-4.jpg',
      username: 'Jane June',
      location: 'Newton Gading Serpong',
      avatar: 'https://sa.kapamilya.com/absnews/abscbnnews/media/2019/news/07/17/20190717-darna-actress-jane-de-leon-abscbn-1.jpg',
      isApprove: true
    },
    {
      id: 'p3',
      item_name: 'Garlic',
      status: 'Unavailable',
      category: 'Garlic',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '2',
      itemImageUrl:
        'https://cdn-prod.medicalnewstoday.com/content/images/articles/265/265853/bulbs-and-bowl-of-garlic.jpg',
      username: 'Cecil',
      location: 'Medang Timur',
      avatar: 'https://images.firstpost.com/wp-content/uploads/2018/08/ananya-panday-380.jpg',
      isApprove: false
    },
  ];

  private _myRequest: Requests[] = [
    {
      id: 'p1',
      item_name: 'Spinach',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '1',
      itemImageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61iHWsT3gvL._SX466_.jpg',
      username: 'Kuncir K.',
      location: 'Newton Timur',
      avatar: 'https://imagevars.gulfnews.com/2019/07/03/MV5BNGExNTkzNTQtZDE5YS00MDM3LWFkMzAtMTM0ZTI1ZDFmNjFkXkEyXkFqcGdeQXVyNDU4OTA2MDk-._V1__16bb83d5e35_large.jpg',
      isApprove: true
    },
    {
      id: 'p2',
      item_name: 'Chili',
      status: 'Available',
      category: 'Dessert',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buyDate: '10 September 2019',
      expDate: '1 November 2019',
      timestamps: '2',
      itemImageUrl:
        'https://4.imimg.com/data4/WJ/MQ/MY-14327327/fresh-red-chilli-500x500.jpg',
      username: 'Cindy C.',
      location: 'Newton Barat',
      avatar: 'https://pbs.twimg.com/profile_images/1123233956009271296/celzcblo.png',
      isApprove: false
    },
  ];

  get allRequest(){
    return [...this._request];
  }

  get allMyRequest(){
    return [...this._myRequest];
  }
}
