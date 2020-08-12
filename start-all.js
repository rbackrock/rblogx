#!/usr/bin/env node

const { execSync } = require('child_process')

const argv = process.argv
let argvPortIndex = -1
const PRINT_TYPE_SUCCESS = `success`
const PRINT_TYPE_FAILURE = `failure`

function print(type=PRINT_TYPE_SUCCESS, msg) {
  if (type === PRINT_TYPE_SUCCESS) {
    console.log(`[INFO] ${msg}`)
  } else if (type === PRINT_TYPE_FAILURE) {
    console.log(`[ERROR] ${msg}`)
  }
}

argvPortIndex = argv.indexOf('-p')
if (argvPortIndex !== -1) {
  const port1 = argv[argvPortIndex + 1]
  const port2 = argv[argvPortIndex + 2]

  if (port1 && port2) {
    const PC_PORT = port1
    const MOBILE_PORT = port2
    const COMMAND_BUILD_PC = `npx next build ./next-project/pc`
    const COMMAND_START_PC = `next start ./next-project/pc -p ${PC_PORT}`
    const COMMAND_BUILD_MOBILE = `next build ./next-project/mobile`
    const COMMAND_START_MOBILE = `next start ./next-project/mobile -p ${MOBILE_PORT}`
    
    execSync(`${COMMAND_BUILD_PC} && ${COMMAND_BUILD_MOBILE} && ${COMMAND_START_PC} && ${COMMAND_START_MOBILE}`, { stdio: 'inherit' })
  } else {
    print(PRINT_TYPE_FAILURE, null, `请执行正确命令，并且指定两个闲置端口号`)
  }
} else {
  print(PRINT_TYPE_FAILURE, null, `请执行正确命令，并且指定两个闲置端口号`)
}