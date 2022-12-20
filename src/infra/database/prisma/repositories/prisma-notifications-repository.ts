import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../../prisma.service';
import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: prismaNotificationData,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: prismaNotificationData.id,
      },
      data: prismaNotificationData,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    // notifications do prisma , camada de persistencia
    const notificationsPrisma = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notificationsPrisma.map((notification) => {
      return PrismaNotificationMapper.toDomain(notification);
    });
  }
}
