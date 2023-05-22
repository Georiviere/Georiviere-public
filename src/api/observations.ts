function fetchObservation(path: string) {
  const commonFields = {
    type: 'object',
    required: ['name_author', 'email_author', 'date_observation', 'type'],
    properties: {
      name_author: {
        type: 'string',
        title: 'Name author',
        maxLength: 128,
        description: 'test flo',
      },
      first_name_author: {
        type: 'string',
        title: 'First name author',
        maxLength: 128,
      },
      email_author: {
        type: 'string',
        title: 'Email',
        format: 'email',
      },
      date_observation: {
        type: 'string',
        title: "Observation's date",
        format: 'datetime-local',
      },
      description: {
        type: 'string',
        title: 'Description',
      },
    },
  };
  if (path === 'damages') {
    return {
      ...commonFields,
      properties: {
        ...commonFields.properties,
        type: {
          type: 'string',
          title: 'Type',
          enum: [
            'Landing',
            'Excessive cutting of riparian forest',
            'Rockslides',
            'Disruptive jam',
            'Bank erosion',
            'River bed incision (sinking)',
            'Fish diseases (appearance of fish)',
            'Fish mortality',
            'Trampling by livestock (impacting)',
          ],
        },
      },
      allOf: [
        {
          if: {
            properties: {
              type: {
                const: 'Landing',
              },
            },
          },
          then: {
            properties: {
              landing_type: {
                type: 'string',
                title: 'Landing Type',
              },
            },
            required: ['landing_type'],
          },
        },
        {
          if: {
            properties: {
              type: {
                const: 'Bank erosion',
              },
            },
          },
          then: {
            properties: {
              length_bank_erosion: {
                type: 'string',
                title: 'Length Bank Erosoion',
              },
            },
          },
        },
        {
          if: {
            properties: {
              type: {
                const: 'River bed incision (sinking)',
              },
            },
          },
          then: {
            properties: {
              bank_height: {
                type: 'string',
                title: 'Bank Height',
              },
            },
          },
        },
        {
          if: {
            properties: {
              type: {
                const: 'Fish mortality',
              },
            },
          },
          then: {
            properties: {
              number_death: {
                type: 'string',
                title: 'Number Death',
              },
            },
          },
        },
      ],
    };
  }
  return commonFields;
}

export function getObservationJsonSchema(path: string) {
  return fetchObservation(path);
}
