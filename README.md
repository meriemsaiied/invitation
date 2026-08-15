# Scrolling Wedding Invitation

A ready-to-host, mobile-first digital invitation inspired by elegant botanical wedding templates.

## Personalize it

Open `config.js` and edit:

- bride
- groom
- weddingDate
- displayDate
- time
- venue
- address
- dressCode
- RSVP deadline
- Google Maps link
- RSVP form link
- program items

That is the only file you need to edit for the text.

## Replace photos

Inside the `assets` folder, replace:

- `couple-placeholder.svg`
- `photo-1.svg`
- `photo-2.svg`
- `photo-3.svg`
- `venue-placeholder.svg`

You can use JPG, PNG, or WebP instead. After replacing a file with a different extension, update its filename in `index.html` or `styles.css`.

## Add music

Put an MP3 file in:

`assets/music.mp3`

The music only starts after the guest taps the music button because browsers block automatic sound.

## Preview in VS Code

Install the “Live Server” extension.

Right-click `index.html` and choose **Open with Live Server**.

## Host free

### Netlify Drop
Drag the entire folder into Netlify Drop.

### GitHub Pages
Upload the files to a GitHub repository and enable Pages in repository settings.

### Vercel
Import the GitHub repository into Vercel. No build command is required because this is a static website.

## Important

Keep all files and folders together when uploading.
