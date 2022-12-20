import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/content';

type Overrride = Partial<NotificationProps>;
export function makeNotification(overrride: Overrride = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Nova solicitação color'),
    recipientId: 'recipient-2',
    ...overrride,
  });
}
