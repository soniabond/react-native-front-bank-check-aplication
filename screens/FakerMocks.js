import _ from 'lodash';
const MockPersonList = new _.times(2, (i) => ({
        id: i,
        index: i,
        key: i,
        name: 'sonia',
        group: _.sample([
          'Family',
          'Friend',
          'Acquaintance',
          'Other'
        ]),
        email: 'sonia@gmail.com'
      })),
    
      MockTweetList = new _.times(2, (i) => ({
        id: i,
        index: i,
        key: i,

      
        // Image:faker.image.business(),
     
      }));
export { MockPersonList,  MockTweetList };