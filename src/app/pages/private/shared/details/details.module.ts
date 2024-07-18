import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";

import { DetailsPageRoutingModule } from "./details.routes";

import { DetailsPage } from "./details.page";

@NgModule({
  imports: [CommonModule, IonicModule, DetailsPageRoutingModule, DetailsPage],
})
export class DetailsPageModule {}