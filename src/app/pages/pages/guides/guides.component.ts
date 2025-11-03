import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpCenterGuidesGuideComponent } from '../../apps/help-center/help-center-guides/help-center-guides-guide/help-center-guides-guide.component';
import {
  Guide,
  GuideCategory
} from '../../apps/help-center/help-center-guides/help-center-guides.component';
import { trackById } from '@vex/utils/track-by';
import { stagger60ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-guides',
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
  animations: [stagger60ms, fadeInUp400ms],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatListModule, NgFor]
})
export class GuidesComponent implements OnInit {
  guides: Guide[] = [
    {
      id: 1,
      label: 'How secure is my password?',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 2,
      label: 'Can I change my username?',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 3,
      label: 'How do I change my email?',
      icon: 'mat:movie_filter',
      category: GuideCategory.accountSettings,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 4,
      label: 'Where can I change my timezone?',
      icon: 'mat:description',
      category: GuideCategory.accountSettings,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 5,
      label: 'How do I change my password?',
      icon: 'mat:movie_filter',
      category: GuideCategory.accountSettings,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 6,
      label: 'Which technologies are used?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 7,
      label: 'How do I make a request?',
      icon: 'mat:movie_filter',
      category: GuideCategory.apiHelp,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 8,
      label: 'What are the API Limits?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 9,
      label: 'How can I apply for the API?',
      icon: 'mat:movie_filter',
      category: GuideCategory.apiHelp,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 10,
      label: 'When can I start developing?',
      icon: 'mat:description',
      category: GuideCategory.apiHelp,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 11,
      label: 'Can I get a refund?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 12,
      label: 'How do I pay?',
      icon: 'mat:movie_filter',
      category: GuideCategory.billing,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 13,
      label: 'Which payment methods are supported?',
      icon: 'mat:movie_filter',
      category: GuideCategory.billing,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 14,
      label: 'Do I need to pay VAT?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 15,
      label: 'Where do I find my purchase code?',
      icon: 'mat:description',
      category: GuideCategory.billing,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 16,
      label: 'How do I download the template?',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 17,
      label: 'Installation Guide',
      icon: 'mat:movie_filter',
      category: GuideCategory.firstSteps,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 18,
      label: 'Creating your first page',
      icon: 'mat:movie_filter',
      category: GuideCategory.firstSteps,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 19,
      label: 'Customizing your template',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      onClick: (guide) => this.openDialog(guide)
    },
    {
      id: 20,
      label: 'How do I contact support?',
      icon: 'mat:description',
      category: GuideCategory.firstSteps,
      onClick: (guide) => this.openDialog(guide)
    }
  ];

  accountSettings = this.guides.filter(
    (guide) => guide.category === GuideCategory.accountSettings
  );
  apiHelp = this.guides.filter(
    (guide) => guide.category === GuideCategory.apiHelp
  );
  billing = this.guides.filter(
    (guide) => guide.category === GuideCategory.billing
  );
  firstSteps = this.guides.filter(
    (guide) => guide.category === GuideCategory.firstSteps
  );

  trackById = trackById;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(guide: Guide) {
    this.dialog.open(HelpCenterGuidesGuideComponent, {
      data: guide,
      width: '600px'
    });
  }
}
