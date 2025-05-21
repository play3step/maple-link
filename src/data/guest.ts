import danbaeng from '../assets/character/danbaeng.png'
import nochil from '../assets/character/nochil.png'
import bigul from '../assets/character/bigul.png'
import mabbak from '../assets/character/mabbak.png'
import moong from '../assets/character/moong.png'
import bigulxenon from '../assets/character/bigulxenon.png'
import meonun from '../assets/character/meonun.png'
import alseom from '../assets/character/alseom.png'
import kkobchang from '../assets/character/kkobchang.png'
import somul from '../assets/character/somul.png'
import boyee from '../assets/character/boyee.png'

export const guest = {
  name: 'Guest',
  ocid: '64031ba7c53d4fa70eda2dca1509a594'
}

export const guestRoom = [
  {
    adminId: 9007199254740991,
    groupName: '노비맙단',
    admins: ['단뱅', '노칠', '비굴', '맙빡'],
    mainGuild: {
      guildId: 123,
      name: '노비맙단'
    },
    subGuild: {
      subGuildIds: [9007199254740992],
      names: ['아르카나']
    }
  }
]

export const guestGuilds = [
  {
    guildId: 9007199254740991,
    guildName: '노비맙단',
    guildMasterName: '단뱅',
    memberDetailResponse: [
      {
        id: 1,
        name: '단뱅',
        level: '286',
        job: '데몬어벤져',
        imagePath: danbaeng,
        type: '본캐',
        mainCharacterInfo: {
          id: 1,
          name: '단뱅',
          level: '286',
          job: '데몬어벤져',
          imagePath: danbaeng,
          description: '1회 경고'
        }
      },
      {
        id: 2,
        name: '노칠',
        level: '290',
        job: '듀얼블레이드',
        imagePath: nochil,
        type: '본캐',
        mainCharacterInfo: {
          id: 2,
          name: '노칠',
          level: '290',
          job: '듀얼블레이드',
          imagePath: nochil,
          description: ''
        }
      },
      {
        id: 3,
        name: '비굴',
        level: '290',
        job: '듀얼블레이드',
        imagePath: bigul,
        type: '본캐',
        mainCharacterInfo: {
          id: 3,
          name: '비굴',
          level: '290',
          job: '듀얼블레이드',
          imagePath: bigul,
          description: ''
        }
      },
      {
        id: 4,
        name: '맙빡',
        level: '290',
        job: '아크메이지(불, 독)',
        imagePath: mabbak,
        type: '본캐',
        mainCharacterInfo: {
          id: 4,
          name: '맙빡',
          level: '290',
          job: '아크메이지(불, 독)',
          imagePath: mabbak,
          description: '휴메'
        }
      },
      {
        id: 5,
        name: '뭉땃쥐',
        level: '260',
        job: '섀도어',
        imagePath: moong,
        type: '부캐',
        mainCharacterInfo: {
          id: 1,
          name: '단뱅',
          level: '286',
          job: '데몬어벤져',
          imagePath: danbaeng
        }
      },
      {
        id: 6,
        name: '비굴제논',
        level: '285',
        job: '제논',
        imagePath: bigulxenon,
        type: '부캐',
        mainCharacterInfo: {
          id: 3,
          name: '비굴',
          level: '290',
          job: '듀얼블레이드',
          imagePath: bigul
        }
      }
    ]
  },
  {
    guildId: 9007199254740992,
    guildName: '아르카나',
    guildMasterName: '소물',
    memberDetailResponse: [
      {
        id: 7,
        name: '머눈',
        level: '281',
        job: '아크메이지(불, 독)',
        imagePath: meonun,
        type: '부캐',
        mainCharacterInfo: {
          id: 2,
          name: '노칠',
          level: '290',
          job: '듀얼블레이드',
          imagePath: nochil
        }
      },
      {
        id: 8,
        name: '알섬',
        level: '280',
        job: '캐논마스터',
        imagePath: alseom,
        type: '부캐',
        mainCharacterInfo: {
          id: 2,
          name: '노칠',
          level: '290',
          job: '듀얼블레이드',
          imagePath: nochil
        }
      },
      {
        id: 9,
        name: '음메보이',
        level: '275',
        job: '팔라딘',
        imagePath: boyee,
        type: '부캐',
        mainCharacterInfo: {
          id: 222,
          name: '쑵모',
          level: '281',
          job: '아란',
          imagePath: nochil
        }
      },
      {
        id: 10,
        name: '꼽챵',
        level: '285',
        job: '비숍',
        imagePath: kkobchang,
        type: '부캐',
        mainCharacterInfo: {
          id: 4,
          name: '맙빡',
          level: '290',
          job: '아크메이지(불, 독)',
          imagePath: mabbak
        }
      },
      {
        id: 11,
        name: '소물',
        level: '270',
        job: '팬텀',
        imagePath: somul,
        type: '부캐',
        mainCharacterInfo: {
          id: 1,
          name: '단뱅',
          level: '286',
          job: '데몬어벤져',
          imagePath: danbaeng
        }
      }
    ]
  }
]

export const guestDetect = [
  {
    guildId: 9007199254740991,
    guildName: '노비맙단',
    toAdd: ['장뱅', '굴비', '평뱅'],
    toRemove: ['눼행', '녜휑']
  },
  {
    guildId: 9007199254740992,
    guildName: '아르카나',
    toAdd: ['여로', '츄츄', '레헬른', '모라스'],
    toRemove: ['세르니움', '오디움', '도원경']
  }
]
