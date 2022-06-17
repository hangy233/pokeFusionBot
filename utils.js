const pokename = require('./pokename.json');

const randomId = () => (Math.random()*151+1)|0;

const isValidId = (id) => id >= 1 && id <= 151 && (id|0 === id);

const getFusedName = ({baseId, faceId, lan = 'en'}) => {
  const faceName = getName({id: faceId});
  const baseName = getName({id: baseId});
  return faceName.slice(0, Math.ceil(faceName.length/2)) + baseName.slice(Math.floor(baseName.length/2));
};

const getName = ({id, lan = 'en'}) => {
  return pokename[id-1][lan];
};

const findId = (name) => {
  for (let i = 0; i < pokename.length; i++) {
    for (const n of Object.values(pokename[i])) {
      if (name.toLowerCase() === n.toLowerCase()) {
        return i+1;
      }
    }
  }

  return null;
}

const formatFuseId = ({face = randomId(), base = randomId()}) => {
  face = face.trim();
  base = base.trim();
  if (isNaN(parseInt(face, 10))) {
    face = findId(face);
  } else {
    face = parseInt(face, 10);
  }
  if (isNaN(parseInt(base, 10))) {
    base = findId(base);
  } else {
    base = parseInt(base, 10);
  }

  return {
    faceId: isValidId(face) ? face : randomId(),
    baseId: isValidId(base) ? base : randomId(),
  }
};

const getFusionMessages = ({faceId, baseId}) => [
  {
    content: `Fusing ${getName({id: faceId})}`,
    embeds: [{ thumbnail: { url: `https://storage.googleapis.com/pokefusion/poke/${faceId}.png` } }],
  },
  {
    content: `and ${getName({id: baseId})}`,
    embeds: [{ thumbnail: { url: `https://storage.googleapis.com/pokefusion/poke/${baseId}.png` } }],
  },
  `...\nGotcha! ${getFusedName({baseId, faceId})}!`,
  `https://storage.googleapis.com/pokefusion/fused/${baseId}.${faceId}.png`,
];

module.exports = {
  findId,
  formatFuseId,
  getFusedName,
  getName,
  randomId,
  getFusionMessages,
};
