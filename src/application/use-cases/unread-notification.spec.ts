import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from '@application/use-cases/unread-notifications';

describe('Unread Notification', () => {
  it('should be able to unread a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    //quando cria a notificação, há ja umda data de leitura
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    //executa a nao leitura
    await unreadNotification.execute({
      notificationId: notification.id,
    });

    //espero q readAt da notificação seja nulo
    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing a notification', async function () {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    //espero um  e rejeita trazendo o NotificationNotFound
    await expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notificatin-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
