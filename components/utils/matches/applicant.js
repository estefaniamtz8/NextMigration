import pick from 'lodash/pick'

function parseApplicants(matches, keys) {
  if (!matches || matches.length === 0) {
    return []
  }

  return matches.map((match) => pick(match, keys))
}

export default parseApplicants
