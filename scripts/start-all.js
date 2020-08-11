#!/usr/bin/env node

const { execSync } = require('child_process')

const PC_PORT = 3000
const MOBILE_PORT = 3001
const COMMAND_START_PC = `npx next build ../next-project/pc`

execSync(`${COMMAND_START_PC}`, { stdio: 'inherit' })
