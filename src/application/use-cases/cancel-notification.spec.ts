import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    //espero q canceledAt seja igual a qualquer informação do tipo Date
    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    //espero um  e rejeita trazendo o NotificationNotFound
    await expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notificatin-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
