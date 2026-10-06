
import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);

  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  // Page 9 → Page 10 reusable gift system
  const [selectedGift, setSelectedGift] = useState(null);
  const [surpriseStep, setSurpriseStep] = useState(0);

  // Page 10 photo + gift animation
  const [photoIndex, setPhotoIndex] = useState(0);
  const [boxOpening, setBoxOpening] = useState(false);

  // Audio control
  const audioRef = useRef(null);

  const gifts = [
    {
      id: 1,
      name: "Anshika",
      emoji: "🎀",
      song: "/songs/anshika.mp3",
      photos: [
        "/images/anshika1.jpg",
        "/images/anshika2.jpg",
        "/images/anshika3.jpg",
        "/images/anshika4.jpg",
      ],
      letter: `Happy birthday kuchu puchu (didiii)
Aapka bhi sahi h itni acchi junior and roommate mili h...aur kya he chahiye 
And senior se chakkar, maut se takkar... Par aap se chalega 
Baki ka saamne he baithi h kya likhu.
 With love acchi anshika

— Anshika`,
    },

    {
      id: 2,
      name: "Shalini",
      emoji: "🌸",
      song: "/songs/shalini.mp3",
      photos: [
        "/images/shalini1.jpg",
        "/images/shalini2.jpg",
        "/images/shalini3.jpg",
        "/images/shalini4.jpg",
      ],
      letter: `Happy Birthday Janviii 🥳🎂💗✨
Welcome to 21 — officially an adult,
         but still figuring life out 😂😭🫶🏻
May this year bring you endless happiness, 
 crazy memories, success, love & lots of 
             reasons to smile! 🥂💫💐
Stay the same crazy, beautiful
 and amazing person you are! 🫂❤️
Have the best birthday everrr! 🎀🎉👑💗,

— Shalini`,
    },

    {
      id: 3,
      name: "Shagun",
      emoji: "🦋",
      song: "/songs/shagun.mp3",
      photos: [
        "/images/shagun1.jpg",
        "/images/shagun2.jpg",
        "/images/shagun3.jpg",
        "/images/shagun4.jpg",
      ],
      letter: `Happy birthday dear didi🎂🎂
      Senior toh bas naam ke ho, warna bond bilkul ekdum sister wala hai 🫶🏻✨ 
      Thank you for always being so sweet, supportive aur meri masti ko tolerate karne ke liye 😂😭
May you always keep smiling, shine brighter, aur life mein jo bhi chaho woh sab mile🧿💫 
Hamesha aise hi amazing, crazy aur beautiful rehna! 💕🫂
So lucky to have you in my life. Happy Birthday, Soulieee! 🥹🎀🎂❤️

— Shagun`,
    },

    {
      id: 4,
      name: "Anushka",
      emoji: "💗",
      song: "/songs/anushka.mp3",
      photos: [
        "/images/anushka1.jpg",
        "/images/anushka2.jpg",
        "/images/anushka3.jpg",
        "/images/anushka4.jpg",
      ],
      letter: `Happy Birthday, Madam! 🎂😂

Aaj tumhara birthday hai, isliye aaj ke din tumhe tolerate karna compulsory hai. 😌😂
Ek saal aur badi ho gayi, par harkatein abhi bhi nursery wali hain. 🤡
Hostel mein tum jaisi specimen milna rare hai… thankfully! 😂
Bas khush raho, maze karo aur cake ka bada piece mujhe do. 🎂😌


— Anushka`,
    },
  ];

  const currentGift = gifts.find(
    (gift) => gift.id === selectedGift
  );

  // =====================================================
  // PAGE 9 → PAGE 10
  // =====================================================

  const openSelectedGift = (gift) => {
    // Stop and reset any previous song
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedGift(gift.id);
    setSurpriseStep(0);
    setPhotoIndex(0);
    setBoxOpening(false);
    setPage(10);
  };

  // =====================================================
  // OPEN PERSONAL GIFT BOX
  // =====================================================

  const openPersonalGiftBox = () => {
    if (boxOpening) return;

    setBoxOpening(true);

    // Let the box opening animation finish first
    setTimeout(() => {
      setSurpriseStep(1);
      setPhotoIndex(0);
    }, 900);
  };

  // =====================================================
  // PLAY AUDIO WHEN SONG STEP STARTS
  // =====================================================

 useEffect(() => {
  if (
    page === 10 &&
    surpriseStep === 1 &&
    audioRef.current
  ) {
    const playAudio = async () => {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
      } catch (error) {
        console.log("Audio play was blocked.");
      }
    };

    playAudio();
  }
}, [page, surpriseStep, selectedGift]);
 

  // =====================================================
  // AUTOMATIC PAGE 10 FLOW
  // =====================================================

  useEffect(() => {
    if (page !== 10 || !currentGift) return;

    // STEP 1 → SONG
    // Song screen stays for 3 seconds
    if (surpriseStep === 1) {
      const timer = setTimeout(() => {
        setPhotoIndex(0);
        setSurpriseStep(2);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // STEP 2 → PHOTOS
    // Each photo stays for 3.5 seconds
    if (surpriseStep === 2) {
      const timer = setTimeout(() => {
        if (photoIndex < currentGift.photos.length - 1) {
          setPhotoIndex((prev) => prev + 1);
        } else {
          // After Photo 4 → automatically show letter
          setSurpriseStep(3);
        }
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [
    page,
    surpriseStep,
    photoIndex,
    currentGift,
  ]);

  // =====================================================
  // BACK TO PAGE 9
  // =====================================================

  const goBackToGifts = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setSelectedGift(null);
    setSurpriseStep(0);
    setPhotoIndex(0);
    setBoxOpening(false);
    setPage(9);
  };

  return (
    <div className="birthday-app">

      {/* =====================================================
          FLOATING DECORATIONS
      ===================================================== */}

      <div className="sticker sticker-1">🎀</div>
      <div className="sticker sticker-2">✨</div>
      <div className="sticker sticker-3">💗</div>
      <div className="sticker sticker-4">🌸</div>
      <div className="sticker sticker-5">⭐</div>
      <div className="sticker sticker-6">🫧</div>

      {/* =====================================================
          PAGE 1
      ===================================================== */}

      {page === 1 && (
        <div className="page-card">

          <div className="top-heart">♡</div>

          <div className="cute-character">
            🧸
          </div>

          <p className="little-text">
            A little something...
          </p>

          <h1>
            Hey, I made
            <br />
            something for you! 💌
          </h1>

          <p className="question">
            Do you want to see? 👀
          </p>

          <div className="buttons">

            <button
              className="yes-button"
              onClick={() => setPage(2)}
            >
              Yes! 💗
            </button>

            <button
              className="no-button"
              onClick={() => setPage(1.5)}
            >
              No 😭
            </button>

          </div>

          <div className="bottom-decoration">
            ♡　✦　♡
          </div>

        </div>
      )}

      {/* =====================================================
          PAGE 1.5
      ===================================================== */}

      {page === 1.5 && (
        <div className="page-card dare-card">

          <div className="top-heart">
            💢
          </div>

          <div className="cute-character angry-character">
            😤
          </div>

          <p className="little-text">
            Excuse me?!
          </p>

          <h1>
            How dare you! 😭
          </h1>

          <p className="question">
            I made something special for you
            <br />
            and you said NO? 🥺
          </p>

          <div className="dare-note">
            👉 Go back and choose wisely! 👈
          </div>

          <button
            className="yes-button"
            onClick={() => setPage(1)}
          >
            Okay okay, go back 💗
          </button>

          <div className="bottom-decoration">
            💗　♡　💗
          </div>

        </div>
      )}

      {/* =====================================================
          PAGE 2
      ===================================================== */}

      {page === 2 && (
        <div className="page-card">

          <div className="top-heart">
            ♡
          </div>

          <div className="cute-character">
            🐰
          </div>

          <p className="little-text">
            I knew it...
          </p>

          <h1>
            That's a
            <br />
            good girl! 💗
          </h1>

          <p className="question">
            I have something special waiting for you ✨
          </p>

          <button
            className="yes-button"
            onClick={() => setPage(3)}
          >
            Click here 💌
          </button>

          <div className="bottom-decoration">
            ♡　✦　♡
          </div>

        </div>
      )}

      {/* =====================================================
          PAGE 3 — BIRTHDAY
      ===================================================== */}

      {page === 3 && (
        <div className="page-card birthday-card">

          <div className="confetti confetti-1">
            ✨
          </div>

          <div className="confetti confetti-2">
            💗
          </div>

          <div className="confetti confetti-3">
            🎀
          </div>

          <div className="confetti confetti-4">
            🌸
          </div>

          <div className="birthday-icon">
            🎂
          </div>

          <p className="birthday-small">
            Today is your special day
          </p>

          <h2>
            Happy Birthday
          </h2>

          <h3>
            to someone very special! 💕
          </h3>

          <div className="birthday-message">

            <p>
              I hope this little surprise
              <br />
              makes your day a little brighter. ✨
            </p>

            <p>
              May your life always be filled
              <br />
              with happiness, laughter & love. 🌷
            </p>

          </div>

          <button
            className="next-button"
            onClick={() => {
              setEnvelopeOpen(false);
              setPage(4);
            }}
          >
            There's more 💌
          </button>

          <div className="birthday-hearts">
            ♡　♡　♡
          </div>

        </div>
      )}

      {/* =====================================================
          PAGE 4 — ENVELOPE
      ===================================================== */}

      {page === 4 && (
        <div className="page-card envelope-page">

          {!envelopeOpen ? (
            <>

              <div className="cute-character envelope-character">
                🐻‍❄️
              </div>

              <p className="little-text">
                A little letter for you
              </p>

              <h1 className="envelope-heading">
                Something
                <br />
                from my heart 💗
              </h1>

              <p className="question">
                Tap the envelope to open it 💌
              </p>

              <div
                className="envelope-wrapper"
                onClick={() => setEnvelopeOpen(true)}
              >

                <div className="envelope">

                  <div className="envelope-back"></div>

                  <div className="letter-preview">
                    💌
                  </div>

                  <div className="envelope-flap"></div>

                  <div className="envelope-front"></div>

                  <div className="envelope-heart">
                    ♥
                  </div>

                </div>

              </div>

              <p className="tap-text">
                tap me ♡
              </p>

            </>
          ) : (
            <>

              <div className="open-letter-character">
                🐣
              </div>

              <p className="little-text">
                For you 💗
              </p>

              <div className="letter-card">

                <div className="letter-top">
                  💌
                </div>

                <h2>
                  A little message
                </h2>

                <p>
                  I just wanted to make
                  <br />
                  your day a little more special. ✨
                </p>

                <p>
                  I hope you keep smiling,
                  <br />
                  keep growing, and keep being
                  <br />
                  the wonderful person you are. 🌷
                </p>

                <p className="letter-ending">
                  Happy Birthday once again! 💗
                </p>

                <div className="letter-sign">
                  — with lots of love ♡
                </div>

              </div>

              <button
                className="next-button"
                onClick={() => {
                  setGiftOpen(false);
                  setPage(5);
                }}
              >
                Next surprise ✨
              </button>

            </>
          )}

        </div>
      )}

      {/* =====================================================
          PAGE 5 — GIFT BOX
      ===================================================== */}

      {page === 5 && (
        <div className="page-card gift-page">

          {!giftOpen ? (
            <>

              <div className="cute-character gift-character">
                🐱
              </div>

              <p className="little-text">
                One more thing...
              </p>

              <h1 className="gift-heading">
                There's a little
                <br />
                surprise for you 🎀
              </h1>

              <p className="question">
                Tap the gift to open it ✨
              </p>

              <div
                className="gift-wrapper"
                onClick={() => setGiftOpen(true)}
              >

                <div className="gift-box">

                  <div className="gift-lid">
                    <div className="gift-ribbon-horizontal"></div>
                  </div>

                  <div className="gift-body">
                    <div className="gift-ribbon-vertical"></div>
                  </div>

                  <div className="gift-bow">
                    <span></span>
                    <span></span>
                    <div></div>
                  </div>

                </div>

              </div>

              <p className="tap-text">
                tap to open ♡
              </p>

            </>
          ) : (
            <>

              <div className="gift-open-character">
                🐿️
              </div>

              <p className="little-text">
                Surprise! ✨
              </p>

              <h1 className="gift-open-heading">
                A little gift
                <br />
                just for you! 🎁
              </h1>

              <div className="gift-message">

                <span>
                  💗
                </span>

                <p>
                  Because you deserve
                  <br />
                  all the little happy things.
                </p>

                <span>
                  ✨
                </span>

              </div>

              <button
                className="next-button"
                onClick={() => setPage(6)}
              >
                One more thing 📸
              </button>

            </>
          )}

        </div>
      )}

      {/* =====================================================
          PAGE 6 — PHOTO
      ===================================================== */}

      {page === 6 && (
        <div className="page-card photo-page">

          <div className="cute-character photo-character">
            🐼
          </div>

          <p className="little-text">
            Some memories...
          </p>

          <h1 className="photo-heading">
            A few moments
            <br />
            worth keeping 💗
          </h1>

          <div className="photo-frame">

            <div className="photo-placeholder">
  <img
    src="/images/memory.jpg"
    alt="A special memory"
  />
</div>

            <div className="frame-decoration frame-heart">
              ♡
            </div>

            <div className="frame-decoration frame-star">
              ✦
            </div>

            <div className="frame-tape"></div>

          </div>

          <p className="photo-caption">
            "Little memories, big smiles." ✨
          </p>

          <button
            className="next-button"
            onClick={() => setPage(7)}
          >
            Click here 💗
          </button>

        </div>
      )}

      {/* =====================================================
          PAGE 7
      ===================================================== */}

      {page === 7 && (
        <div className="page-card surprise-page">

          <div className="surprise-stars">
            ✨　💗　✨
          </div>

          <div className="surprise-character">
            🐰
          </div>

          <p className="little-text">
            Wait... there's more!
          </p>

          <h1>
            One more
            <br />
            surprise for you 🎀
          </h1>

          <p className="question">
            I saved something special for this part. 🥹
          </p>

          <button
            className="yes-button"
            onClick={() => setPage(8)}
          >
            Tap here 💗
          </button>

          <div className="bottom-decoration">
            ♡　✦　♡
          </div>

        </div>
      )}

      {/* =====================================================
          PAGE 8 — VIRTUAL HUG
      ===================================================== */}

      {page === 8 && (
        <div className="page-card hug-page">

          <div className="hug-sparkles">
            ✨　🌸　✨
          </div>

          <div className="hug-character">
            🧸🤗
          </div>

          <p className="little-text">
            Sending you something...
          </p>

          <h1>
            A Virtual Hug
            <br />
            For You 🤗💗
          </h1>

          <div className="hug-card">

            <div className="hug-big">
              🫂
            </div>

            <p>
              Consider this your
              <br />
              biggest virtual hug! 💗
            </p>

            <span>
              Squeeze received? 🥹
            </span>

          </div>

          <button
            className="next-button"
            onClick={() => setPage(9)}
          >
            Next ✨
          </button>

        </div>
      )}

      {/* =====================================================
          PAGE 9 — FOUR GIFTS
      ===================================================== */}

      {page === 9 && (
        <div className="page-card four-gifts-page">

          <div className="gift-choice-top">
            🎁　💗　🎁
          </div>

          <p className="little-text">
            Okay... one last thing!
          </p>

          <h1>
            Four more gifts
            <br />
            for you 🎁
          </h1>

          <p className="gift-choice-subtitle">
            Choose one gift to discover
            <br />
            something special. 👀
          </p>

          <div className="warning-note">

            <div className="note-pin">
              📌
            </div>

            <h3>
              IMPORTANT NOTE 🚨
            </h3>

            <p>
              These four gifts are from
              <br />
              the four of us. 💗
            </p>

            <p>
              Whoever's gift you open first
              <br />
              means you love that person
              <br />
              the most. 😤😂
            </p>

            <strong>
              Your choice is being recorded... 👀
            </strong>

            <p className="warning-last">
              So think carefully before opening one,
              <br />
              because later you may get
              <br />
              "punished" according to this rank. 😭😂
            </p>

          </div>

          <p className="choose-text">
            Choose wisely... 👀
          </p>

          <div className="four-gifts-grid">

            {gifts.map((gift) => (
              <div
                key={gift.id}
                className="choice-gift"
                onClick={() => openSelectedGift(gift)}
              >

                <div className="mini-gift">

                  <div className="mini-gift-bow">
                    🎀
                  </div>

                  <div className="mini-gift-box">
                    <span></span>
                  </div>

                </div>

                <p>
                  {gift.emoji} {gift.name}
                </p>

                <small>
                  Open me
                </small>

              </div>
            ))}

          </div>

          <button
            className="next-button gift-next-button"
            onClick={() => setPage(11)}
          >
            Next ✨
          </button>

        </div>
      )}

      {/* =====================================================
          PAGE 10 — REUSABLE PERSONAL GIFT
          
          Same page for:
          Anshika / Shalini / Shagun / Anushka
      ===================================================== */}

      {page === 10 && currentGift && (
        <div className="page-card personal-surprise-page">

          {/* AUDIO
              Mounted when Step 1 begins.
              It remains mounted through photos + letter.
              Loop makes the song restart automatically.
          */}

          {page === 10 && currentGift && (
  <audio
    ref={audioRef}
    src={currentGift.song}
    loop
    preload="auto"
  />
)}

          {/* BACK TO GIFTS */}

          {surpriseStep >= 1 && (
            <button
              className="back-to-gifts-button"
              onClick={goBackToGifts}
            >
              ← Back to Gifts
            </button>
          )}

          {/* =================================================
              STEP 0 — CLOSED BOX
          ================================================= */}

          {surpriseStep === 0 && (
            <>

              <div className="surprise-stars">
                ✨　💗　✨
              </div>

              <p className="little-text">
                A special surprise from
              </p>

              <h1>
                {currentGift.name} {currentGift.emoji}
              </h1>

              <p className="question">
                There's something waiting
                <br />
                inside this box for you... 👀
              </p>

              <div
                className={`personal-box-wrapper ${
                  boxOpening ? "box-opening" : ""
                }`}
                onClick={
                  !boxOpening
                    ? openPersonalGiftBox
                    : undefined
                }
              >

                <div className="personal-box">

                  <div className="personal-box-bow">

                    <span></span>
                    <span></span>

                    <div></div>

                  </div>

                  <div className="personal-box-lid">

                    <div className="personal-box-ribbon-horizontal"></div>

                  </div>

                  <div className="personal-box-body">

                    <div className="personal-box-ribbon"></div>

                  </div>

                </div>

              </div>

              <p className="tap-text">
                {boxOpening
                  ? "Opening your surprise... ✨"
                  : "Tap to open 🎁"}
              </p>

            </>
          )}

          {/* =================================================
              STEP 1 — SONG
          ================================================= */}

          {surpriseStep === 1 && (
            <>

              <div className="opened-box-character">
                🎁✨
              </div>

              <p className="little-text">
                {currentGift.name} has something for you...
              </p>

              <h1>
                This song is
                <br />
                dedicated to you 💗
              </h1>

              <div className="song-card">

                <div className="song-icon">
                  🎵
                </div>

                <h3>
                  A special song
                </h3>

                <p>
                  From {currentGift.name} 💗
                </p>

                <div className="music-note-animation">
                  ♪ ♫ ♪ ♫ ♪
                </div>

                <p className="song-playing-text">
                  Your song is playing... 🎶
                </p>

              </div>

            </>
          )}

          {/* =================================================
              STEP 2 — AUTOMATIC PHOTOS
          ================================================= */}

          {surpriseStep === 2 && (
            <>

              <div className="memory-header">
                📸 💗 📸
              </div>

              <p className="little-text">
                Some memories with {currentGift.name}
              </p>

              <h1>
                Little moments,
                <br />
                big memories ✨
              </h1>

              <div className="single-memory-photo">

                <img
                  key={currentGift.photos[photoIndex]}
                  src={currentGift.photos[photoIndex]}
                  alt={`${currentGift.name} memory ${
                    photoIndex + 1
                  }`}
                />

                <div className="photo-number">
                  {photoIndex + 1} / {currentGift.photos.length}
                </div>

              </div>

              <p className="photo-progress">
                A little memory at a time... 💗
              </p>

            </>
          )}

          {/* =================================================
              STEP 3 — AUTOMATIC LETTER
          ================================================= */}

          {surpriseStep === 3 && (
            <>

              <div className="letter-surprise-icon">
                💌
              </div>

              <p className="little-text">
                And finally...
              </p>

              <h1>
                A little letter
                <br />
                for you 💗
              </h1>

              <div className="personal-letter">

                <div className="letter-flower">
                  🌷
                </div>

                <div className="letter-paper">

                  <div className="letter-paper-top">
                    💌
                  </div>

                  <h2>
                    For You
                  </h2>

                  <div className="letter-text">

                    <p>
                      {currentGift.letter}
                    </p>

                  </div>

                  <div className="letter-paper-bottom">
                    ✨　♡　🌷
                  </div>

                </div>

              </div>

              <button
                className="next-button"
                onClick={goBackToGifts}
              >
                ← Back to Gifts
              </button>

            </>
          )}

        </div>
      )}

      {/* =====================================================
          PAGE 11 — FINAL QUESTION
      ===================================================== */}

      {page === 11 && (
        <div className="page-card final-question-page">

          <div className="final-character">
            🐱💗
          </div>

          <p className="little-text">
            Okay... one last question 👀
          </p>

          <h1>
            Kal barbaad 
            <br />
           hone chale? 💸😂
          </h1>

          <p className="question">
            Please choose wisely. 😌
          </p>

          <div className="final-buttons">

            <button
              className="yes-button final-yes"
              onClick={() => setPage(12)}
            >
              YES! 💗
            </button>

            <button
              className="no-button moving-no"
              onMouseEnter={(e) => {
                const button = e.currentTarget;

                const x =
                  Math.random() * 500 - 250;

                const y =
                  Math.random() * 300 - 150;

                button.style.transform =
                  `translate(${x}px, ${y}px)`;
              }}
              onMouseMove={(e) => {
                const button = e.currentTarget;

                const x =
                  Math.random() * 500 - 250;

                const y =
                  Math.random() * 300 - 150;

                button.style.transform =
                  `translate(${x}px, ${y}px)`;
              }}
              onClick={(e) => {
                e.preventDefault();

                const button = e.currentTarget;

                const x =
                  Math.random() * 500 - 250;

                const y =
                  Math.random() * 300 - 150;

                button.style.transform =
                  `translate(${x}px, ${y}px)`;
              }}
            >
              NO 😭
            </button>

          </div>

          <p className="no-hint">
            You really thought you could click NO? 😂
          </p>

        </div>
      )}

      {/* =====================================================
          PAGE 12 — YES
      ===================================================== */}

      {page === 12 && (
        <div className="page-card final-yes-page">

          <div className="celebration-character">
            🥳💗
          </div>

          <div className="confetti-big">
            ✨　🎀　💗　🌸　🎉
          </div>

          <h1>
            Good girl! 😂💗
          </h1>

          <p className="question">
            Thank you so much! 🥹
          </p>

          <div className="money-note">

            💸

            <p>
              Paise lekar chalna! 😂
            </p>

            💸

          </div>

          <button
            className="next-button"
            onClick={() => setPage(13)}
          >
            Next ✨
          </button>

        </div>
      )}

      {/* =====================================================
          PAGE 13 — GOODBYE
      ===================================================== */}

      {page === 13 && (
        <div className="page-card goodbye-page">

          <div className="goodbye-character">
            🧸💗
          </div>

          <div className="goodbye-hearts">
            ♡　💗　♡
          </div>

          <h1>
            Bas itna hi tha! 🥹
          </h1>

          <p className="question">
            I hope you liked your little surprise. ✨
          </p>

          <div className="goodbye-message">

            Happy Birthday once again! 🎂💗

            <br />

            Stay happy, keep smiling

            <br />

            and keep shining! 🌷✨

          </div>

          <div className="bye-text">
            Bye Bye! 👋💗
          </div>

          <button
            className="home-button"
            onClick={() => {

              // Stop any audio
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }

              setPage(1);
              setEnvelopeOpen(false);
              setGiftOpen(false);
              setSelectedGift(null);
              setSurpriseStep(0);
              setPhotoIndex(0);
              setBoxOpening(false);

            }}
          >
            🏠 Back to Home
          </button>

        </div>
      )}

    </div>
  );
}

export default App;
