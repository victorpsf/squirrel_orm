/**
 * @param {*} code 
 * 
 * através do código ASC retorna valor
 * caso seja caracter especial ex: [/]  [\/]
 *                                 [\]  [\\]
 *                                 [*]  [\*]
 * caso seja latin             ex: [Ã]  [[Ãã]]
 *                                 [é]  [[Éé]]
 * caso seja numero            ex: [5]  [5]
 *                                 [11] [11]
 * 
 * @returns string
 */
const RegexpASC = function (code) {
  let char = '';
  switch(code) {
    // character: ' ' code: '32' 
    case 32: return `\\s`;
    // character: '0' code: '48' 
    // character: '1' code: '49' 
    // character: '2' code: '50' 
    // character: '3' code: '51' 
    // character: '4' code: '52' 
    // character: '5' code: '53' 
    // character: '6' code: '54' 
    // character: '7' code: '55' 
    // character: '8' code: '56' 
    // character: '9' code: '57' 
    case 48:
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57: 
      return `${String.fromCharCode(code)}`;
    // character: '!' code: '33' 
    // character: '"' code: '34' 
    // character: '#' code: '35' 
    // character: '$' code: '36' 
    // character: '%' code: '37' 
    // character: '&' code: '38' 
    // character: ''' code: '39' 
    // character: '(' code: '40' 
    // character: ')' code: '41' 
    // character: '*' code: '42' 
    // character: '+' code: '43' 
    // character: ',' code: '44' 
    // character: '-' code: '45' 
    // character: '.' code: '46' 
    // character: '/' code: '47' 
    // character: ':' code: '58' 
    // character: ';' code: '59' 
    // character: '<' code: '60' 
    // character: '=' code: '61' 
    // character: '>' code: '62' 
    // character: '?' code: '63' 
    // character: '@' code: '64' 
    // character: '[' code: '91' 
    // character: '\' code: '92' 
    // character: ']' code: '93' 
    // character: '^' code: '94' 
    // character: '_' code: '95' 
    // character: '`' code: '96' 
    // character: '{' code: '123' 
    // character: '|' code: '124' 
    // character: '}' code: '125' 
    // character: '~' code: '126' 
    // character: '' code: '127' 
    // character: '€' code: '128' 
    // character: '' code: '129' 
    // character: '‚' code: '130' 
    // character: 'ƒ' code: '131' 
    // character: '„' code: '132' 
    // character: '…' code: '133' 
    // character: '†' code: '134' 
    // character: '‡' code: '135' 
    // character: 'ˆ' code: '136' 
    // character: '‰' code: '137' 
    // character: 'Š' code: '138' 
    // character: '‹' code: '139' 
    // character: 'Œ' code: '140' 
    // character: '' code: '141' 
    // character: 'Ž' code: '142' 
    // character: '' code: '143' 
    // character: '' code: '144' 
    // character: '‘' code: '145' 
    // character: '’' code: '146' 
    // character: '“' code: '147' 
    // character: '”' code: '148' 
    // character: '•' code: '149' 
    // character: '–' code: '150' 
    // character: '—' code: '151' 
    // character: '˜' code: '152' 
    // character: '™' code: '153' 
    // character: 'š' code: '154' 
    // character: '›' code: '155' 
    // character: 'œ' code: '156' 
    // character: '' code: '157' 
    // character: 'ž' code: '158' 
    // character: '' code: '160' 
    // character: '¡' code: '161' 
    // character: '¢' code: '162' 
    // character: '£' code: '163' 
    // character: '¤' code: '164' 
    // character: '¥' code: '165' 
    // character: '¦' code: '166' 
    // character: '§' code: '167' 
    // character: '¨' code: '168' 
    // character: '©' code: '169' 
    // character: 'ª' code: '170' 
    // character: '«' code: '171' 
    // character: '¬' code: '172' 
    // character: '­' code: '173' 
    // character: '®' code: '174' 
    // character: '¯' code: '175' 
    // character: '°' code: '176' 
    // character: '±' code: '177' 
    // character: '²' code: '178' 
    // character: '³' code: '179' 
    // character: '´' code: '180' 
    // character: 'µ' code: '181' 
    // character: '¶' code: '182' 
    // character: '·' code: '183' 
    // character: '¸' code: '184' 
    // character: '¹' code: '185' 
    // character: 'º' code: '186' 
    // character: '»' code: '187' 
    // character: '¼' code: '188' 
    // character: '½' code: '189' 
    // character: '¾' code: '190' 
    // character: '¿' code: '191' 
    // character: 'Æ' code: '198' 
    // character: 'Ø' code: '216' 
    // character: 'ß' code: '223' 
    // character: 'æ' code: '230' 
    // character: '÷' code: '247' 
    // character: 'ø' code: '248' 
    // character: 'þ' code: '254' 
    // character: '×' code: '215' 
    // character: 'Þ' code: '222' 
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64: 
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96: 
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 222:
    case 215:
    case 123:
    case 124:
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
    case 130:
    case 131:
    case 132:
    case 133:
    case 134:
    case 135:
    case 136:
    case 137:
    case 138:
    case 139:
    case 140:
    case 141:
    case 142:
    case 143:
    case 144:
    case 145:
    case 146:
    case 147:
    case 148:
    case 149:
    case 150:
    case 151:
    case 152:
    case 153:
    case 154:
    case 155:
    case 156:
    case 157:
    case 158:
    case 160:
    case 161:
    case 162:
    case 163:
    case 164:
    case 165:
    case 166:
    case 167:
    case 168:
    case 169:
    case 170:
    case 171:
    case 172:
    case 173:
    case 174:
    case 175:
    case 176:
    case 177:
    case 178:
    case 179:
    case 180:
    case 181:
    case 182:
    case 183:
    case 184:
    case 185:
    case 186:
    case 187:
    case 188:
    case 189:
    case 190:
    case 198:
    case 191:
    case 216:
    case 223:
    case 230:
    case 247:
    case 248:
    case 254:
      return `\\${String.fromCharCode(code)}`;
    // character: 'A' code: '65' 
    // character: 'B' code: '66' 
    // character: 'C' code: '67' 
    // character: 'D' code: '68' 
    // character: 'E' code: '69' 
    // character: 'F' code: '70' 
    // character: 'G' code: '71' 
    // character: 'H' code: '72' 
    // character: 'I' code: '73' 
    // character: 'J' code: '74' 
    // character: 'K' code: '75' 
    // character: 'L' code: '76' 
    // character: 'M' code: '77' 
    // character: 'N' code: '78' 
    // character: 'O' code: '79' 
    // character: 'P' code: '80' 
    // character: 'Q' code: '81' 
    // character: 'R' code: '82' 
    // character: 'S' code: '83' 
    // character: 'T' code: '84' 
    // character: 'U' code: '85' 
    // character: 'V' code: '86' 
    // character: 'W' code: '87' 
    // character: 'X' code: '88' 
    // character: 'Y' code: '89' 
    // character: 'Z' code: '90' 
    // character: 'a' code: '97' 
    // character: 'b' code: '98' 
    // character: 'c' code: '99' 
    // character: 'd' code: '100' 
    // character: 'e' code: '101' 
    // character: 'f' code: '102' 
    // character: 'g' code: '103' 
    // character: 'h' code: '104' 
    // character: 'i' code: '105' 
    // character: 'j' code: '106' 
    // character: 'k' code: '107' 
    // character: 'l' code: '108' 
    // character: 'm' code: '109' 
    // character: 'n' code: '110' 
    // character: 'o' code: '111' 
    // character: 'p' code: '112' 
    // character: 'q' code: '113' 
    // character: 'r' code: '114' 
    // character: 's' code: '115' 
    // character: 't' code: '116' 
    // character: 'u' code: '117' 
    // character: 'v' code: '118' 
    // character: 'w' code: '119' 
    // character: 'x' code: '120' 
    // character: 'y' code: '121' 
    // character: 'z' code: '122' 
    case 65:
    case 66:
    case 67:
    case 68:
    case 69:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 80:
    case 81:
    case 82:
    case 83:
    case 84:
    case 85:
    case 86:
    case 87:
    case 88:
    case 89:
    case 90: 
    case 97: 
    case 98: 
    case 99: 
    case 100:
    case 101:
    case 102:
    case 103:
    case 104:
    case 105:
    case 106:
    case 107:
    case 108:
    case 109:
    case 110:
    case 111:
    case 112:
    case 113:
    case 114:
    case 115:
    case 116:
    case 117:
    case 118:
    case 119:
    case 120:
    case 121:
    case 122:
      char = String.fromCharCode(code).toLowerCase();
      return `[${char.toUpperCase()}${char.toLowerCase()}]`;
    // character: 'Õ' code: '213' 
    // character: 'õ' code: '245' 
    case 213:
    case 245:
      return `[${String.fromCharCode(213)}${String.fromCharCode(245)}]`;
    // character: 'Ö' code: '214' 
    // character: 'ö' code: '246' 
    case 214:
    case 246:
      return `[${String.fromCharCode(214)}${String.fromCharCode(246)}]`;
    // character: 'Ù' code: '217' 
    // character: 'ù' code: '249' 
    case 217:
    case 249:
      return `[${String.fromCharCode(217)}${String.fromCharCode(249)}]`;
    // character: 'Ú' code: '218' 
    // character: 'ú' code: '250' 
    case 218:
    case 250:
      return `[${String.fromCharCode(218)}${String.fromCharCode(250)}]`;
    // character: 'Û' code: '219' 
    // character: 'û' code: '251' 
    case 219:
    case 251:
      return `[${String.fromCharCode(219)}${String.fromCharCode(251)}]`;
    // character: 'Ü' code: '220' 
    // character: 'ü' code: '252' 
    case 220:
    case 252:
      return `[${String.fromCharCode(220)}${String.fromCharCode(252)}]`;
    // character: 'Ý' code: '221' 
    // character: 'ý' code: '253' 
    case 221:
    case 253:
      return `[${String.fromCharCode(221)}${String.fromCharCode(253)}]`;
    // character: 'ÿ' code: '255'
    // character: 'Ÿ' code: '159' 
    case 159:
    case 255:
      return `[${String.fromCharCode(159)}${String.fromCharCode(255)}]`;
    // character: 'Ô' code: '212' 
    // character: 'ô' code: '244' 
    case 212:
    case 244:
      return `[${String.fromCharCode(212)}${String.fromCharCode(244)}]`;
    // character: 'Ó' code: '211' 
    // character: 'ó' code: '243' 
    case 211:
    case 243:
      return `[${String.fromCharCode(211)}${String.fromCharCode(243)}]`;
    // character: 'Ò' code: '210' 
    // character: 'ò' code: '242' 
    case 210:
    case 242:
      return `[${String.fromCharCode(210)}${String.fromCharCode(242)}]`;
    // character: 'Ñ' code: '209' 
    // character: 'ñ' code: '241' 
    case 209:
    case 241:
      return `[${String.fromCharCode(209)}${String.fromCharCode(241)}]`;
    // character: 'Ð' code: '208' 
    // character: 'ð' code: '240' 
    case 208:
    case 240:
      return `[${String.fromCharCode(208)}${String.fromCharCode(240)}]`;
    // character: 'Ï' code: '207' 
    // character: 'ï' code: '239' 
    case 207:
    case 239:
      return `[${String.fromCharCode(207)}${String.fromCharCode(239)}]`;
    // character: 'Î' code: '206' 
    // character: 'î' code: '238' 
    case 206:
    case 238:
      return `[${String.fromCharCode(206)}${String.fromCharCode(238)}]`;
    // character: 'Í' code: '205' 
    // character: 'í' code: '237' 
    case 205:
    case 237:
      return `[${String.fromCharCode(205)}${String.fromCharCode(237)}]`;
    // character: 'Ì' code: '204' 
    // character: 'ì' code: '236' 
    case 204:
    case 236:
      return `[${String.fromCharCode(204)}${String.fromCharCode(236)}]`;
    // character: 'Ë' code: '203' 
    // character: 'ë' code: '235' 
    case 203:
    case 235:
      return `[${String.fromCharCode(203)}${String.fromCharCode(235)}]`;
    // character: 'Ê' code: '202' 
    // character: 'ê' code: '234' 
    case 202:
    case 234:
      return `[${String.fromCharCode(202)}${String.fromCharCode(234)}]`;
    // character: 'É' code: '201' 
    // character: 'é' code: '233' 
    case 201:
    case 233:
      return `[${String.fromCharCode(201)}${String.fromCharCode(233)}]`;
    // character: 'È' code: '200' 
    // character: 'è' code: '232' 
    case 200:
    case 232:
      return `[${String.fromCharCode(200)}${String.fromCharCode(232)}]`;
    // character: 'Ç' code: '199' 
    // character: 'ç' code: '231' 
    case 199:
    case 231:
      return `[${String.fromCharCode(199)}${String.fromCharCode(231)}]`;
    // character: 'Å' code: '197' 
    // character: 'å' code: '229' 
    case 197:
    case 229:
      return `[${String.fromCharCode(197)}${String.fromCharCode(229)}]`;
    // character: 'Ä' code: '196' 
    // character: 'ä' code: '228' 
    case 196:
    case 228:
      return `[${String.fromCharCode(196)}${String.fromCharCode(228)}]`;
    // character: 'Â' code: '194' 
    // character: 'â' code: '226' 
    case 194:
    case 226:
      return `[${String.fromCharCode(194)}${String.fromCharCode(226)}]`;
    // character: 'Á' code: '193' 
    // character: 'á' code: '225' 
    case 193:
    case 225:
      return `[${String.fromCharCode(193)}${String.fromCharCode(225)}]`;
    // character: 'À' code: '192' 
    // character: 'à' code: '224' 
    case 192:
    case 224:
      return `[${String.fromCharCode(192)}${String.fromCharCode(224)}]`;
    // character: 'Ã' code: '195' 
    // character: 'ã' code: '227' 
    case 195:
    case 227:
      return `[${String.fromCharCode(195)}${String.fromCharCode(227)}]`;
    default: return '';
  }
}

/**
 * @param {string} value 
 * 
 * obtem string e retorna ums string para 
 * ser utilizada em regexp
 * 
 * @returns string
 */
const StringRegExp = function (value = '') {
  let string = '';

  for(let index in value) {
    string += RegexpASC(value.charCodeAt(index));
  }

  return string;
}

exports.RegexpASC = RegexpASC;
exports.StringRegExp  = StringRegExp;