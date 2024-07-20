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
      description: "All your itens in sight as lists filtered 'by type'",
    },
    {
      id: 2,
      title: "Boxes",
      description: "Create and manage boxes for all-around purposes",
    },
    {
      id: 3,
      title: "Collections",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
    },
    {
      id: 4,
      title: "People",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
    },
    {
      id: 5,
      title: "Locations",
      description: "Where in the world did you leave those things?",
    },
  ];

  public getSubjects(): Array<Subjects> {
    return this.subjects;
  }

  public getSubject(subjectId: number) {
    return this.subjects.find(subject => subject.id === subjectId);
  }
}
