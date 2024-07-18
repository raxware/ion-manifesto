import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { Subjects } from "../../../../model/interfaces";
import { SubjectsService } from "../../../../services/subjects.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule]
})
export class DetailsPage implements OnInit {
  public subjects: { id: number; title: string; description: string, route: string } | undefined;

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit() {
    // "id" is the name of the parameter in the
    // app-routing.module.ts file:
    // ==> path: "details/:id",
    const subjectId = +this.route.snapshot.params['id'];

    this.subjects = this.subjectsService.getSubject(subjectId);
  }
}
