const priority = {
   HIGHEST: "HIGHEST",
   HIGH: "HIGH",
   MEDIUM: "MEDIUM",
   LOW: "LOW"
}

const roles = {
   MP: "MP",
   TST: "TST",
}

const severity = {
   CRITICAL: 'CRITICAL',
   MAJOR: 'MAJOR',
   MODERATE: 'MODERATE',
   MINOR: 'MINOR',
   COSMETIC: 'COSMETIC'
}

const status = {
   SOLVED: "SOLVED",
   PENDING: "PENDING",
   UNSOLVED: "UNSOLVED",
}

module.exports = { priority, roles, severity, status };