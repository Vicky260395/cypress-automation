describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://beta.altergame.click/')
    cy.contains('span',' ENTER ITW UNIVERSE').click()
    cy.wait(5000)
    let userDetails = "%22%7B%5C%22userId%5C%22%3A8%2C%5C%22emailAddress%5C%22%3A%5C%22vignesh.s462%40gmail.com%5C%22%2C%5C%22teams%5C%22%3A%5B%7B%5C%22teamId%5C%22%3A49%2C%5C%22TOUserId%5C%22%3A8%2C%5C%22TOProfileImageUrl%5C%22%3A%5C%22https%3A%2F%2Fs3.ap-southeast-1.amazonaws.com%2Flxcrm-files%2Fuser%2Fprofile-photos%2F8_nJnOrv1amQsgvBAzB16DYvA4Q.jpg%5C%22%2C%5C%22TOUserName%5C%22%3A%5C%22Vignesh%20S462%5C%22%2C%5C%22isTO%5C%22%3Atrue%7D%2C%7B%5C%22teamId%5C%22%3A47%2C%5C%22TOUserId%5C%22%3A26%2C%5C%22TOProfileImageUrl%5C%22%3A%5C%22https%3A%2F%2Fs3.ap-southeast-1.amazonaws.com%2Flxcrm-files%2Fuser%2Fprofile-photos%2F5_a41nDFlpogNn9k5X5xfXvcBpI.jpeg%5C%22%2C%5C%22TOUserName%5C%22%3A%5C%22Adbhimany%20Kumara%5C%22%2C%5C%22isTO%5C%22%3Afalse%7D%5D%2C%5C%22roles%5C%22%3A%5B%5C%22TO%5C%22%2C%5C%22ADMIN%5C%22%2C%5C%22BO%5C%22%2C%5C%22PO%5C%22%5D%2C%5C%22gender%5C%22%3A%5C%22MALE%5C%22%2C%5C%22isFirstLogin%5C%22%3Afalse%2C%5C%22picture%5C%22%3A%5C%22https%3A%2F%2Fs3.ap-southeast-1.amazonaws.com%2Flxcrm-files%2Fuser%2Fprofile-photos%2F8_nJnOrv1amQsgvBAzB16DYvA4Q.jpg%5C%22%2C%5C%22userName%5C%22%3A%5C%22Vignesh%20S462%5C%22%2C%5C%22token%5C%22%3A%5C%22eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcl9pZCI6OCwidXNlckVtYWlsIjoidmlnbmVzaC5zNDYyQGdtYWlsLmNvbSIsInVzZXJOYW1lIjoiVmlnbmVzaCBTNDYyIiwiZGV2aWNlSWQiOiIiLCJyb2xlcyI6WyJUTyIsIkFETUlOIiwiQk8iLCJQTyJdLCJpYXQiOjE3MzMzNzk4MTh9.iy5DlPbgnYNR6p5bt7VRt7EOxUYLEUcKgklDNg2HyLY%5C%22%2C%5C%22chatEndpoint%5C%22%3A%5C%22https%3A%2F%2Fvjl1zj8fz2.execute-api.ap-southeast-1.amazonaws.com%2Fdev%5C%22%2C%5C%22verticalName%5C%22%3A%5C%22360%20IO%5C%22%2C%5C%22verticalImage%5C%22%3A%5C%22https%3A%2F%2Flxcrm-files.s3.ap-southeast-1.amazonaws.com%2Fdefault-images%2Fvertical-images%2Fitw-io.png%5C%22%2C%5C%22authCode%5C%22%3A%5C%22ya29.a0AeDClZDJ4A4mH_FmwiF0x9wllCG7kXZzT0RJxvPhGyScNLdU3xZca90nIumSzswqC60YZ3QdI6IQgcn3R9sqIdbQ597RIoaAhWm40uWUurWYvJgtbW_Vey_0oCckaBlv6h5JwcTT9QFtequ6zs7pIeCI9MMFpQsyfdzJaCgYKASkSARASFQHGX2Mi_SABNKC4aGelADIF-rodPQ0171%5C%22%7D%22"
    cy.setCookie('adminAuthInfo',userDetails) 
    cy.visit('https://beta.altergame.click/home') 
    //   cy.window().then((win) => {
  //     cy.stub(win, 'open', url => {
  //         win.location.href = 'https://accounts.google.com/v3/signin/identifier?gsiwebsdk=3&client_id=663494931054-2fd2danneqb0klh07052ruabvmtt8pnh.apps.googleusercontent.com&scope=openid%20profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=storagerelay%3A%2F%2Fhttps%2Fbeta.altergame.click%3Fid%3Dauth197814&prompt=select_account&response_type=token&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow&continue=https%3A%2F%2Faccounts.google.com%2Fsignin%2Foauth%2Fconsent%3Fauthuser%3Dunknown%26part%3DAJi8hANq_8oTh0RCQY2_VDlSTF0ObFXIHZWD18uNLWSL-eCHC0_iHpKIMkmSQTfjJag3r-u9iYxDNQ1PY_flHPsaIysbonNl3fKqA6mIWQXsGkire6ek0Cjqa53soUchdqCSCrFC_lIg3O7E---IGfwBuiQRb_OMdEr1LDvzujdZwzKCqf3TFGgTFXebs_kbAhMBsjBOlbatWzscqybZd_gA_7_w94InMEuXWyOuOL8D4PqryL2Pg8MaTYtww9mIL1FDoNWr2KikJseMBRYtThmB_sdNpyWb2I2ElJwWThYV93xHyZ1uKkJ5a_ewSNqostcqjFDbPqjzRJeqqxS4i5j_QtMIMT72E5Pv0AD6NrdBU0_LH0VWWsz1Du_Uj87OMMxCiT8NCssnwcsj7OzpJg3fdojXakh2wdDPja2hMwecIfwRxGsT9qfvaQIv40YOEZ6FSwo2AAYSMVK9CzTrkkUOmCgRYPI4Vg%26flowName%3DGeneralOAuthFlow%26as%3DS269242259%253A1733327302601220%26client_id%3D663494931054-2fd2danneqb0klh07052ruabvmtt8pnh.apps.googleusercontent.com%23.herokuapp.com/';
  //     }).as("popup")
  // })

    // cy.get('#open-window').click()
    // cy.get('@windowOpen').should('be.calledWith', 'page1.html')
    // cy.get('[name=identifier]').type('vignesh.s462@gmail.com')
    // cy.contains('span','Next').click()
    // cy.wait(5000)
    // cy.get('[name=Passwd]').type('Seenivasan@60')
    // cy.contains('span','Next').click()
  })
})