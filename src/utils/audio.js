export const playNoticeAudio = () => {
  const noticeMusic = document.getElementById('noticeMusic')

  if (noticeMusic && typeof noticeMusic.play == 'function') {
    noticeMusic.play().catch(err => {
      /* eslint-disable */
      console.log(
        '%c     ',
        "background-image: url('http://media0.giphy.com/media/MOWPkhRAUbR7i/giphy.gif'); background-repeat: no-repeat; background-size: 250px 113px; font-size: 113px;",
        'Relaxed, There Is No Error, Just Need Some User Touch!',
        err
      )
      /* eslint-enable */
    })
  }
}
