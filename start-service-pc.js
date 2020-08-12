#!/usr/bin/env node

const { execSync } = require('child_process')

const argv = process.argv
const NEED_PORT_ERROR_MSG = `请执行正确命令，并且指定两个闲置端口号`
let argvPortIndex = -1
let port = null

argvPortIndex = argv.indexOf('-p')
if (argvPortIndex !== -1 && (port = argv[argvPortIndex + 1])) {
  const COMMAND_BUILD_PC = `npx next build ./next-project/pc`
  const COMMAND_START_PC = `npx next start ./next-project/pc -p ${port}`
  
  execSync(`${COMMAND_BUILD_PC} && ${COMMAND_START_PC}`, { stdio: 'inherit' })
} else {
  console.log(`[ERROR] ${NEED_PORT_ERROR_MSG}`)
}

