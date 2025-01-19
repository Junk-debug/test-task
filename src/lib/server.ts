import { faker } from "@faker-js/faker";

export const saveFile = (): Promise<string> =>
  new Promise((res, rej) => {
    const timeToResolve = faker.number.int({ min: 1000, max: 3000 });

    setTimeout(() => {
      Math.random() > 0.5
        ? res(`Success: ${faker.system.commonFileName()} saved`)
        : rej(`Error: ${faker.system.commonFileName()} not saved`);
    }, timeToResolve);
  });
