const Footer = () => {
    return(
         <footer>
            {/* FOOTER */}
            <div className="footer d-flex justify-content-center align-items-center">
                <p className="fw-3 fs-4 py-3 m-0"> &copy; 2026 Portoflio EBC</p>

                {/**Linkendin Icon */}
                <a href="https://www.linkedin.com/in/emiliabellido" target="_blank" className="p-3">
                    <i className="bi bi-linkedin fs-3 icon-footer"></i>
                </a>

                {/** Github Icon */}
                <a href="https://github.com/emilia-bellido" target="_blank" className="p-3">
                    <i className="bi bi-github fs-3 icon-footer"></i>
                </a>



            </div>
        </footer>
    );
};

export default Footer;