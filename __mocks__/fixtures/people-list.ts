export const peopleListCast = Array(3)
  .fill({})
  .map((_, index) => ({
    profilePath: `/cast-profilePath${index}`,
    character: `character${index}`,
    name: `cast-name${index}`,
    id: `cast-id${index}`,
  }));

export const peopleListCrew = Array(3)
  .fill({})
  .map((_, index) => ({
    profilePath: `/crew-profilePath${index}`,
    department: `department${index}`,
    name: `crew-name${index}`,
    job: `job${index}`,
    id: `crew-id${index}`,
  }));
