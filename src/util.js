function isTerminal() {
    return !!process.env.TERM_PROGRAM
}

module.exports =  {
    isTerminal
}