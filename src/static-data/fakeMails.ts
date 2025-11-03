import { Mail } from '../app/pages/apps/mail/interfaces/mail.interface';
import {
  randBoolean,
  randEmail,
  randFileExt,
  randFileName,
  randFullName,
  randNumber,
  randParagraph,
  randRecentDate,
  randSentence
} from '@ngneat/falso';
import { MailLabel } from '../app/pages/apps/mail/interfaces/mail-label.interface';
import { MailAttachment } from '../app/pages/apps/mail/interfaces/mail-attachment.interface';

const fakeMailLabels: MailLabel[] = [
  {
    label: 'Business',
    classes: ['bg-primary-600/10', 'text-primary-600']
  },
  {
    label: 'Secret',
    classes: ['bg-teal-600/10', 'text-teal-600']
  },
  {
    label: 'Important',
    classes: ['bg-warn/10', 'text-warn']
  },
  {
    label: 'Private',
    classes: ['bg-purple-600/10', 'text-purple-600']
  }
];

function createFakeMailAttachment(_seed: string): MailAttachment {
  const type = randFileExt();
  const imgUrl = `assets/img/demo/${randNumber({ min: 1, max: 8 })}.jpg`;

  return {
    label: randFileName() + type,
    type,
    imgUrl
  };
}

function createFakeMail(id: string): Mail {
  const from: Mail['from'] = {
    name: randFullName(),
    email: randEmail(),
    imgUrl: `assets/img/avatars/${randNumber({ min: 1, max: 20 })}.jpg`
  };

  const to: Mail['to'] = {
    name: 'David Smith',
    email: 'david.smith@example.org'
  };

  const date: string = randRecentDate({ days: 30 }).toISOString();
  const subject: string = randSentence();

  const body: string = `<p>Hey ${
    to.name
  }</p><br/><p>${randParagraph()}</p><br/><p>${randParagraph()}</p><br/><p>Best,<br/>${
    from.name
  }</p>`;

  const labels: MailLabel[] = randBoolean()
    ? []
    : [fakeMailLabels[randNumber({ min: 1, max: 3 })]];
  const attachments: MailAttachment[] = randBoolean()
    ? []
    : createArray(randNumber({ min: 1, max: 3 })).map((seed) =>
        createFakeMailAttachment(String(seed))
      );
  const read: boolean = randBoolean();
  const starred: boolean = randBoolean();

  return {
    id: Number.parseInt(id),
    from,
    to,
    date,
    subject,
    body,
    labels,
    attachments,
    read,
    starred
  };
}

function createArray(length: number) {
  const array = [];

  for (let i = 0; i < length; i++) {
    array.push(i);
  }

  return array;
}

const fakeMailAttachments: MailAttachment[] = createArray(5).map((id) =>
  createFakeMailAttachment(String(id))
);
export const fakeMails: Mail[] = createArray(20).map((id) =>
  createFakeMail(String(id))
);
