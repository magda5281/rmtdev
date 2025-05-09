export default function Footer() {
  return (
    <footer className='footer'>
      <small>
        <p>
          © {new Date().getFullYear()}
          <a
            href='https://portfolio-8cyp.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            HERDEVLAB
          </a>
          Build for my portfolio.
        </p>
      </small>

      <p>
        <span className='u-bold'>109573</span> total jobs available
      </p>
    </footer>
  );
}
