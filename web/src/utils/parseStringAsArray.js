export default function parseStringAsArray(stringAsArray) {
    return stringAsArray.split(',').map(x => x.trim())
} 