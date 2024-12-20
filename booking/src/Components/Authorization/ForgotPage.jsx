import React from "react";
import {Route, Link, Routes} from "react-router-dom";


function ForgotPage(props) {

    return (
		<section class="h-100">
			<div class="container h-100">
				<div class="row justify-content-sm-center h-100">
					<div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
						<div class="text-center my-5">
							<img src="/image/logo/kvartirnik_logo.png" alt="logo" className="w-100"/>
						</div>
						<div class="card shadow-lg   rounded-5">
							<div class="card-body p-5">
								<h1 class="fs-4 card-title fw-bold mb-4">Forgot Password</h1>
								<form method="POST" class="needs-validation" novalidate="" autocomplete="off">
									<div class="mb-3">
										<label class="mb-2 text-muted" for="email">E-Mail Address</label>
										<input id="email" type="email" class="form-control" name="email"
											   required autofocus/>
										<div class="invalid-feedback">
											Email is invalid
										</div>
									</div>

									<div class="d-flex align-items-center">
										<button type="submit" class="btn btn-primary ms-auto">
											Send Link
										</button>
									</div>
								</form>
							</div>
							<div class="card-footer py-3 border-0">
								<div class="text-center">
									Remember your password? <Link to="/login" class="text-dark">Login</Link>
								</div>
							</div>
						</div>
						<div class="text-center mt-5 text-muted">
							Copyright &copy; 2017-2021 &mdash; Your Company
						</div>
					</div>
				</div>
			</div>
			<script src="js/login.js"></script>
		</section>


	);
};

export default ForgotPage;