import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from '@application/use-cases/read-notifications';

describe('Read Notification', () => {
  it('should be able to read a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    //espero q canceledAt seja igual a qualquer informação do tipo Date
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new ReadNotification(notificationsRepository);

    //espero um  e rejeita trazendo o NotificationNotFound
    await expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notificatin-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
