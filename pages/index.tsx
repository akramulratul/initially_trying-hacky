import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '../lib/client-utils';
import styles from '../styles/Home.module.css';

interface TabsProps {
  children: ReactElement[];
  selectedIndex?: number;
  onTabSelected?: (index: number) => void;
}

function Tabs(props: TabsProps) {
  const activeIndex = props.selectedIndex ?? 0;
  if (!props.children) {
    return <></>;
  }

  let tabs = React.Children.map(props.children, (child, index) => {
    return (
      <button
        className="lk-button"
        onClick={() => {
          if (props.onTabSelected) props.onTabSelected(index);
        }}
        aria-pressed={activeIndex === index}
      >
        {child?.props.label}
      </button>
    );
  });
  return (
    <div className={styles.tabContainer}>
      <div className={styles.tabSelect}>{tabs}</div>
      {props.children[activeIndex]}
    </div>
  );
}

function DemoMeetingTab() {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));
  const startMeeting = () => {
    if (e2ee) {
      router.push(`/rooms/${generateRoomId()}#${encodePassphrase(sharedPassphrase)}`);
    } else {
      router.push(`/rooms/${generateRoomId()}`);
    }
  };
  return (
    <div className={styles.roomList}>
      <h1>Ongoing session</h1>
      <div className={styles.tabContent}>
        <div className={styles.roomTitle}>
          <p style={{ margin: 0, color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Recovering from trauma
          </p>
          <div className={styles.isLive}>
            <p style={{ margin: 0, color: '#1f8cf9', fontWeight: 'bold', fontSize: '10px' }}>
              LIVE
            </p>
            <img alt="" src="/gif/wavegif.gif" style={{ height: '44px', width: '44px' }} />
          </div>
        </div>
        <div className={styles.hostContainer}>
          <div className={styles.flexContainer}>
            <img src="/images/john.png" alt="" style={{ height: '50px', width: '50px' }} />
            <div className={styles.hostDetails}>
              <h4>John</h4>
              <p>8m ago - 8 participants</p>
            </div>
          </div>
          <div>
            <button
              style={{ display: 'flex', alignItems: 'center' }}
              className={`lk-button ${styles.buttonColor}`}
              onClick={startMeeting}
            >
              Join session
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}></div>
          {e2ee && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <label htmlFor="passphrase">Passphrase</label>
              <input
                id="passphrase"
                type="password"
                value={sharedPassphrase}
                onChange={(ev) => setSharedPassphrase(ev.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <h1>Previous sessions</h1>
      <div className={styles.tabContent}>
        <div className={styles.roomTitle}>
          <p style={{ margin: 0, color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Grief journey support
          </p>
          {/* <div className={styles.isLive}>
            <p style={{ margin: 0, color: '#1f8cf9', fontWeight: 'bold', fontSize: '10px' }}>
              LIVE
            </p>
            <img alt="" src="/gif/wavegif.gif" style={{ height: '44px', width: '44px' }} />
          </div> */}
        </div>
        <div className={styles.hostContainer}>
          <div className={styles.flexContainer}>
            <img src="/images/antti.png" alt="" style={{ height: '50px', width: '50px' }} />
            <div className={styles.hostDetails}>
              <h4>Kimmy</h4>
              <p>4 days ago - 8 participants</p>
            </div>
          </div>
          {/* <div>
            <button
              style={{ display: 'flex', alignItems: 'center' }}
              className={`lk-button ${styles.buttonColor}`}
              onClick={startMeeting}
            >
              Join room
            </button>
          </div> */}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}></div>
          {e2ee && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <label htmlFor="passphrase">Passphrase</label>
              <input
                id="passphrase"
                type="password"
                value={sharedPassphrase}
                onChange={(ev) => setSharedPassphrase(ev.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.tabContent}>
        <div className={styles.roomTitle}>
          <p style={{ margin: 0, color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
            Understanding your emotions
          </p>
          <div className={styles.isLive}>
            {/* <p style={{ margin: 0, color: 'green' }}>LIVE</p> */}
            {/* <img alt="" src="/images/wave.png" style={{ height: '44px', width: '44px' }} /> */}
          </div>
        </div>
        <div className={styles.hostContainer}>
          <div className={styles.flexContainer}>
            <img src="/images/kimmy.png" alt="" style={{ height: '50px', width: '50px' }} />
            <div className={styles.hostDetails}>
              <h4>Antti</h4>
              <p>7 days ago - 6 participants</p>
            </div>
          </div>
          {/* <div>
            <button
              style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}
              className={`lk-button ${styles.buttonColor}`}
              onClick={startMeeting}
            >
              Join room
            </button>
          </div> */}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}></div>
          {e2ee && (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <label htmlFor="passphrase">Passphrase</label>
              <input
                id="passphrase"
                type="password"
                value={sharedPassphrase}
                onChange={(ev) => setSharedPassphrase(ev.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CustomConnectionTab({ label }: { label: string }) {
  const router = useRouter();

  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const serverUrl = formData.get('serverUrl');
    const token = formData.get('token');
    if (e2ee) {
      router.push(
        `/custom/?liveKitUrl=${serverUrl}&token=${token}#${encodePassphrase(sharedPassphrase)}`,
      );
    } else {
      router.push(`/custom/?liveKitUrl=${serverUrl}&token=${token}`);
    }
  };
  return (
    <form className={styles.tabContent} onSubmit={onSubmit}>
      <p style={{ marginTop: 0 }}>
        Connect Meet with a custom server using LiveKit Cloud or LiveKit Server.
      </p>
      <input
        id="serverUrl"
        name="serverUrl"
        type="url"
        placeholder="LiveKit Server URL: wss://*.livekit.cloud"
        required
      />
      <textarea
        id="token"
        name="token"
        placeholder="Token"
        required
        rows={5}
        style={{ padding: '1px 2px', fontSize: 'inherit', lineHeight: 'inherit' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <input
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Enable end-to-end encryption</label>
        </div>
        {e2ee && (
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <label htmlFor="passphrase">Passphrase</label>
            <input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>

      <hr
        style={{ width: '100%', borderColor: 'rgba(255, 255, 255, 0.15)', marginBlock: '1rem' }}
      />
      <button
        style={{ paddingInline: '1.25rem', width: '100%' }}
        className="lk-button"
        type="submit"
      >
        Connect
      </button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps<{ tabIndex: number }> = async ({
  query,
  res,
}) => {
  res.setHeader('Cache-Control', 'public, max-age=7200');
  const tabIndex = query.tab === 'custom' ? 1 : 0;
  return { props: { tabIndex } };
};

const Home = ({ tabIndex }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  function onTabSelected(index: number) {
    const tab = index === 1 ? 'custom' : 'demo';
    router.push({ query: { tab } });
  }
  return (
    <>
      <main className={styles.main} data-lk-theme="default">
        <div className="header">
          {/* <img src="/images/livekit-meet-home.svg" alt="LiveKit Meet" width="360" height="45" /> */}
          Choose your room
        </div>
        <DemoMeetingTab />
      </main>
      {/* <footer data-lk-theme="default">
        Hosted on{' '}
        <a href="https://livekit.io/cloud?ref=meet" rel="noopener">
          LiveKit Cloud
        </a>
        . Source code on{' '}
        <a href="https://github.com/livekit/meet?ref=meet" rel="noopener">
          GitHub
        </a>
        .
      </footer> */}
    </>
  );
};

export default Home;
