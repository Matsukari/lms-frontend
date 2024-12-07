import { Component, signal } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatTabsModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  school = signal(null);
  constructor(
    private groupService: GroupService
  ) { }
  ngOnInit() {
    this.groupService.getSchool().subscribe((data: any) => {
      data.overview = "Harvard College is a close-knit undergraduate community within Harvard University. With world-class faculty, groundbreaking research opportunities, and a commitment to a diverse environment of bright, talented students, Harvard is more than just a place to get an education—it's where students come to be transformed.";
      data.mission = "The mission of Harvard College is to educate the citizens and citizen-leaders for our society. We do this through our commitment to the transformative power of a liberal arts and sciences education. \n Beginning in the classroom with exposure to new ideas, new ways of understanding, and new ways of knowing, students embark on a journey of intellectual transformation. Through a diverse living environment, where students live with people who are studying different topics, who come from different walks of life and have evolving identities, intellectual transformation is deepened and conditions for social transformation are created. From this we hope that students will begin to fashion their lives by gaining a sense of what they want to do with their gifts and talents, assessing their values and interests, and learning how they can best serve the world."
      data.vision = "Harvard College sets the standard for residential liberal arts and sciences education. We have committed to creating and sustaining the conditions that enable all Harvard College students to experience an unparalleled educational journey that is intellectually, socially, and personally transformative."
      data.goal = "When you attend Harvard College, you become a part of the rich history of the nation’s oldest institution of higher learning. Founded in 1636, Harvard has changed dramatically over the centuries, but has always served as a haven for the world’s most ambitious scholars and leaders."

      this.school.set(data);
    })
  }
}
