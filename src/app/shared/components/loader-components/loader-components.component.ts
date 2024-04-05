import { Component } from '@angular/core';
import { LoadingService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-components',
  templateUrl: './loader-components.component.html',
  styleUrls: ['./loader-components.component.css']
})
export class LoaderComponentsComponent {


  constructor(public  loadingService: LoadingService) {}



}
