
function Footer() {
  const year:number = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
