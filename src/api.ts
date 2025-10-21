import { ContactDto, GroupContactsDto } from "src/types/dto";
import { Response } from "src/types/response";
import { API_URL } from "src/constants/api";

class Api {
  async getContacts(): Promise<Response<ContactDto[]>> {
    const response = await this.fetch(API_URL.CONTACTS);

    if (!response.ok) {
      return {
        success: false,
        error: "Ошибка загрузки контактов",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }

  async getGroups(): Promise<Response<GroupContactsDto[]>> {
    const response = await this.fetch(API_URL.GROUPS);

    if (!response.ok) {
      return {
        success: false,
        error: "Ошибка загрузки групп",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  }

  private async fetch(url: string, config?: RequestInit) {
    return fetch(url, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }
}

export const api = new Api();
