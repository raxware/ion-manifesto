import { Injectable } from '@angular/core';
import { Subjects } from "../../app/model/interfaces";


@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjects = [
    {
      id: 1,
      title: "Collections",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
      route: "",
    },
    {
      id: 2,
      title: "Boxes",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
      route: "",
    },
    {
      id: 3,
      title: "Lists",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
      route: "",
    },
    {
      id: 4,
      title: "People",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
      route: "",
    },
    {
      id: 5,
      title: "Locations",
      description: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.",
      route: "",
    },
  ];

  public getSubjects(): Array<Subjects> {
    return this.subjects;
  }

  public getSubject(subjectId: number) {
    return this.subjects.find(subject => subject.id === subjectId);
  }
}
