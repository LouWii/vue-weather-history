export const stationColors = [
  'blue',
  'orange',
  'yellow',
  'purple',
]

export function getStationColor(stationIndex) {
  if (stationIndex > stationColors.length - 1) {
    console.error('stationColor: Station index outside of color list bounds')
    stationIndex = 0
  }

  return stationColors[stationIndex]
}
