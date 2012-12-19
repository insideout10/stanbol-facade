var Cont = [];

var A_cnt1_1 = "";
var A_cnt1_2 = "";
var A_cnt1_3 = "";

var A_cnt2_1 = "";
var A_cnt2_2 = "";
var A_cnt2_3 = "";

var A_cnt3_1 = "";
var A_cnt3_2 = "";
var A_cnt3_3 = "";

var A_cnt4_1 = "";
var A_cnt4_2 = "";
var A_cnt4_3 = "";

var Geo = [];

var A_geo1_1 = "";
var A_geo1_2 = "";
var A_geo1_3 = "";

var A_geo2_1 = "";
var A_geo2_2 = "";
var A_geo2_3 = "";

var A_geo3_1 = "";
var A_geo3_2 = "";
var A_geo3_3 = "";

var Feel = [];

var A_feel1_1 = "";
var A_feel1_2 = "";
var A_feel1_3 = "";

var A_feel2_1 = "";
var A_feel2_2 = "";
var A_feel2_3 = "";

var A_feel3_1 = "";
var A_feel3_2 = "";
var A_feel3_3 = "";

var A_brand_1 = "";
var A_brand_2 = "";
var A_brand_3 = "";

var A_prof_1 = "";
var A_prof_2 = "";
var A_prof_3 = "";

if (adm_geo || adm_geo == "") {
    // costruzione OAS_ADMX
    if (adm_geo == "other" || adm_geo == "") {
        adm_geo = "";
    }
    else {
        adm_geo = adm_geo.split("|");
        Geo = adm_geo[0].split(";");
        A_geo1_1 = "&A_geo1=" + Geo[0];
        A_geo2_1 = "&A_geo2=" + Geo[1];
        A_geo3_1 = "&A_geo3=" + Geo[2];
        if (adm_geo[1]) {
            Geo = adm_geo[1].split(";");
            A_geo1_2 = "&A_geo1=" + Geo[0];
            A_geo2_2 = "&A_geo2=" + Geo[1];
            A_geo3_2 = "&A_geo3=" + Geo[2];
        }
        if (adm_geo[2]) {
            Geo = adm_geo[2].split(";");
            A_geo1_3 = "&A_geo1=" + Geo[0];
            A_geo2_3 = "&A_geo2=" + Geo[1];
            A_geo3_3 = "&A_geo3=" + Geo[2];
        }
        adm_geo = adm_geo.join(";").split(";").join(',').split(" ").join('');
    }
    
    if (adm_cont == "other" || adm_cont == "") {
        adm_cont = "";
    }
    else {
        adm_cont = adm_cont.split("|");
        Cont = adm_cont[0].split(";");
        A_cnt1_1 = "&A_cnt1=" + Cont[0];
        A_cnt2_1 = "&A_cnt2=" + Cont[1];
        A_cnt3_1 = "&A_cnt3=" + Cont[2];
        A_cnt4_1 = "&A_cnt4=" + Cont[3];
        if (adm_cont[1]) {
            Cont = adm_cont[1].split(";");
            A_cnt1_2 = "&A_cnt1=" + Cont[0];
            A_cnt2_2 = "&A_cnt2=" + Cont[1];
            A_cnt3_2 = "&A_cnt3=" + Cont[2];
            A_cnt4_2 = "&A_cnt4=" + Cont[3];
        }
        if (adm_cont[2]) {
            Cont = adm_cont[2].split(";");
            A_cnt1_3 = "&A_cnt1=" + Cont[0];
            A_cnt2_3 = "&A_cnt2=" + Cont[1];
            A_cnt3_3 = "&A_cnt3=" + Cont[2];
            A_cnt4_3 = "&A_cnt4=" + Cont[3];
        }
        adm_cont = adm_cont.join(";").split(";").join(',').split(" ").join('');
    }
    
    if (adm_feel == "other" || adm_feel == "") {
        adm_feel = "";
    }
    else {
        adm_feel = adm_feel.split("|");
        Feel = adm_feel[0].split(";");
        A_feel1_1 = "&A_feel1=" + Feel[0];
        A_feel2_1 = "&A_feel2=" + Feel[1];
        A_feel3_1 = "&A_feel3=" + Feel[2];
        if (adm_feel[1]) {
            Feel = adm_feel[1].split(";");
            A_feel1_2 = "&A_feel1=" + Feel[0];
            A_feel2_2 = "&A_feel2=" + Feel[1];
            A_feel3_2 = "&A_feel3=" + Feel[2];
        }
        if (adm_feel[2]) {
            Feel = adm_feel[2].split(";");
            A_feel1_3 = "&A_feel1=" + Feel[0];
            A_feel2_3 = "&A_feel2=" + Feel[1];
            A_feel3_3 = "&A_feel3=" + Feel[2];
        }
        adm_feel = adm_feel.join(";").split(";").join(',').split(" ").join('');
    }
    
    if (adm_brand == "other" || adm_brand == "") {
        adm_brand = "";
    }
    else {
        adm_brand = adm_brand.split("|");
        A_brand_1 = "&A_brand=" + adm_brand[0];
        if (adm_brand[1]) {
            A_brand_2 = "&A_brand=" + adm_brand[1];
        }
        if (adm_brand[2]) {
            A_brand_3 = "&A_brand=" + adm_brand[2];
        }
        adm_brand = adm_brand.join(";").split(";").join(',').split(" ").join('');
    }
    
    if (adm_prof == "other" || adm_prof == "") {
        adm_prof = "";
    }
    else {
        adm_prof = adm_prof.split("|");
        A_prof_1 = "&A_prof=" + adm_prof[0];
        if (adm_prof[1]) {
            A_prof_2 = "&A_prof=" + adm_prof[1];
        }
        if (adm_prof[2]) {
            A_prof_3 = "&A_prof=" + adm_prof[2];
        }
        adm_prof = adm_prof.join(";").split(";").join(',').split(" ").join('');
    }
    OAS_ADMX = 'adm_geo=' + adm_geo + '&adm_brand=' + adm_brand + '&adm_cont=' + adm_cont + '&adm_feel=' + adm_feel + '&adm_prof=' + adm_prof + '&';
    OAS_ADMX2 = A_geo1_1 + A_geo1_2 + A_geo1_3 + A_geo2_1 + A_geo2_2 + A_geo2_3 + A_geo3_1 + A_geo3_2 + A_geo3_3 + A_cnt1_1 + A_cnt1_2 + A_cnt1_3 + A_cnt2_1 + A_cnt2_2 + A_cnt2_3 + A_cnt3_1 + A_cnt3_2 + A_cnt3_3 + A_cnt4_1 + A_cnt4_2 + A_cnt4_3 + A_feel1_1 + A_feel1_2 + A_feel1_3 + A_feel2_1 + A_feel2_2 + A_feel2_3 + A_feel3_1 + A_feel3_2 + A_feel3_3 + A_brand_1 + A_brand_2 + A_brand_3 + A_prof_1 + A_prof_2 + A_prof_3;
    
}

