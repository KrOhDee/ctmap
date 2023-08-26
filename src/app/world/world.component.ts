import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { GeonamesService } from '../geonames.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css'],
})
export class WorldComponent implements AfterViewInit {
  @ViewChild('worldMapSvg') worldMapSvg!: ElementRef;
  countryDetails: any = {};

  constructor(
    private geonamesService: GeonamesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    const object = this.worldMapSvg.nativeElement;
    object.onload = () => {
      const svg = object.contentDocument;
      const paths = svg.querySelectorAll('path');

      paths.forEach((path: any) => {
        path.addEventListener('click', (event: any) => {
          const countryCode = event.target.getAttribute('id');

          paths.forEach((innerPath: any) => {
            innerPath.setAttribute('fill', 'black');
          });

          event.target.setAttribute('fill', 'red');

          console.log('Fetching details for country:', countryCode);
          this.fetchCountryDetails(countryCode);
        });
      });
    };
  }

  fetchCountryDetails(countryCode: string): void {
    this.geonamesService
      .getCountryInfo(countryCode)
      .subscribe((response: any) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'application/xml');
        console.log(xmlDoc);

        const countryName =
          xmlDoc.getElementsByTagName('countryName')[0]?.textContent;
        const capital = xmlDoc.getElementsByTagName('capital')[0]?.textContent;
        const areaInSqKm =
          xmlDoc.getElementsByTagName('areaInSqKm')[0]?.textContent;
        const population =
          xmlDoc.getElementsByTagName('population')[0]?.textContent;
        const continent =
          xmlDoc.getElementsByTagName('continentName')[0]?.textContent;
        const currencyCode =
          xmlDoc.getElementsByTagName('currencyCode')[0]?.textContent;

        this.countryDetails = {
          countryName: countryName,
          capital: capital,
          area: areaInSqKm,
          population: population,
          continent: continent,
          currencyCode: currencyCode,
        };
        this.cdr.detectChanges();
      });
  }
}
