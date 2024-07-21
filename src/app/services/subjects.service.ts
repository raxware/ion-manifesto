import { Injectable } from '@angular/core';
import { Subjects } from "../../app/model/interfaces";


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjects = [
    {
      id: 1,
      title: "Lists",
      description: "All your items listed or filtered 'by type'",
    },
    {
      id: 2,
      title: "Repositories",
      description: "Set your own repositories for all-around purposes",
    },
    {
      id: 3,
      title: "Collections",
      description: "A place for everything, everything in its place",
      //"Order is repetition of units. Chaos is multiplicity without rhythm.",

    },
    {
      id: 4,
      title: "People",
      description: "Lending to friends severely damages their memory",
    },
    {
      id: 5,
      title: "Places",
      description: "Where in the world did you leave that damn thing?",
    },
  ];

  public getSubjects(): Array<Subjects> {
    return this.subjects;
  }

  public getSubject(subjectId: number) {
    return this.subjects.find(subject => subject.id === subjectId);
  }
}
