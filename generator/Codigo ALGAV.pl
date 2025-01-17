% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_dispatch)).

% Base de conhecimento
%dados Campus

pisos(a, [a1,a2]).
pisos(b, [b1,b2,b3]).
pisos(c, [c1,c2,c3,c4]).
pisos(d, [d1,d2,d3]).

corredor(a,b,a2,b2).
corredor(b,c,b2,c3).
corredor(b,c,b3,c4).
corredor(b,d,b2,d3).
corredor(c,d,c2,d2).
corredor(c,d,c3,d3).

%
elevador(a, [a1,a2]).
elevador(b, [b1,b2,b3]).
elevador(c, [c1,c2,c3,c4]).
elevador(d, [d1,d2,d3]).

%ligacÃ£o
liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

%Dados Pisos
%salas
sala(adn,11,6,a1).

sala(a201,5,6,a2).
sala(a202,7,7,a2).
sala(a203,7,5,a2).
sala(a204,10,7,a2).
sala(a205,10,5,a2).
sala(a206,14,7,a2).
sala(a207,14,5,a2).
sala(a207B,18,9,a2).
sala(a209,18,3,a2).

sala(b101,3,5,b1).
sala(b103,6,5,b1).
sala(b105,13,5,b1).
sala(b106,20,5,b1).
sala(b102,3,7,b1).
sala(b106,17,7,b1).
sala(b104,7,9,b1).
sala(b106B,20,9,b1).
sala(b106C,20,5,b1).

sala(b203,7,7,b2).
sala(b202,13,4,b2).
sala(b205,19,7,b2).
sala(b207,20,5,b2).

sala(b301,5,2,b3).
sala(b303,7,2,b3).
sala(b305,13,2,b3).
sala(b302,14,8,b3).

sala(c101,6,3,c1).
sala(c103,6,7,c1).
sala(c105,6,19,c1).
sala(c102,8,3,c1).
sala(c104,8,7,c1).
sala(c106,8,11,c1).
sala(c108,8,15,c1).
sala(c110,8,19,c1).

sala(c201,5,3,c2).
sala(c203,5,6,c2).
sala(c205,10,11,c2).
sala(c207,5,12,c2).
sala(c209,3,17,c2).
sala(c202,8,5,c2).
sala(c204,7,15,c2).
sala(c206,10,13,c2).

sala(c301,5,7,c3).
sala(c303,3,17,c3).
sala(c305,6,17,c3).
sala(c302,6,5,c3).
sala(c304,8,7,c3).
sala(c306,11,11,c3).
sala(c308,11,15,c3).
sala(c310,10,17,c3).

sala(c401,7,7,c4).
sala(c403,6,15,c4).
sala(c402,11,6,c4).
sala(c404,11,13,c4).

sala(d101,3,5,d1).
sala(d103,5,11,d1).
sala(d105,5,16,d1).
sala(d108,7,19,d1).
sala(d106,7,13,d1).
sala(d104,7,8,d1).
sala(d102,11,3,d1).

sala(d201,5,4,d2).
sala(d203,5,11,d2).
sala(d205,5,16,d2).
sala(d206,7,18,d2).
sala(d204,9,16,d2).
sala(d202,8,11,d2).

sala(d301,5,9,d3).
sala(d303,5,12,d3).
sala(d305,7,18,d3).
sala(d304,9,12,d3).
sala(d302,9,9,d3).

%posiÃ§Ã£o corredores
corr_pos(a2b2,23,6,a2).
corr_pos(b2a2,1,6,b2).

corr_pos(b2c3,23,9,b2).
corr_pos(c3b2,1,10,c3).

corr_pos(b2d3,21,11,b2).
corr_pos(d3b2,11,1,d3).

corr_pos(c2d2,1,16,c2).
corr_pos(d2c2,13,2,d2).

corr_pos(c3d3,1,16,c3).
corr_pos(d3c3,13,2
        ,d3).

corr_pos(b3c4,23,9,b3).
corr_pos(c4b3,1,10,c4).

%posiÃ§Ã£o elevadores
elev_pos(ea1,22,1,a1).
elev_pos(ea2,22,1,a2).

elev_pos(eb1,22,8,b1).
elev_pos(eb2,22,8,b2).
elev_pos(eb3,22,8,b3).

elev_pos(ec1,1,14,c1).
elev_pos(ec2,1,14,c2).
elev_pos(ec3,1,14,c3).
elev_pos(ec4,1,14,c4).

elev_pos(ed1,1,1,d1).
elev_pos(ed2,1,1,d2).
elev_pos(ed3,1,1,d3).

:- dynamic node/5.
:- dynamic edge/4.
:-set_prolog_flag(answer_write_options,[max_depth(0)]).
:-set_prolog_flag(report_error,true).
:-set_prolog_flag(unknown,error).

matrizA1([
          [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 3, 8, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizA2([
          [3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 3, 8, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 4, 2, 2, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 3, 2, 4, 2, 2, 4, 2, 2, 2, 4, 2, 2, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
          [3, 2, 2, 2, 2, 2, 4, 2, 3, 4, 2, 2, 3, 4, 2, 2, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 4, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
        ]).

matrizB1([
            [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 4, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 4, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 4, 2, 1, 0, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 4, 2, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 6, 1],
            [1, 0, 0, 0, 1, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 3, 4, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizB2([
            [3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 5, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 3, 4, 2, 2, 1],
            [10, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 5, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 6, 1],
            [1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0, 0, 10],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 2, 0]
          ]).

matrizB3([
            [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 5, 0, 5, 0, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 3, 4, 2, 2, 2, 2, 1, 0, 0, 6, 1],
            [1, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 10],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizC1([
            [3, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 1, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 0, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1],
            [9, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 1, 0, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 5, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

matrizC2([
            [3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 1, 0, 2, 4, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 2, 2, 2, 2, 2, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [3, 2, 2, 2, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 3, 2, 2, 2, 2, 4, 0, 0, 1],
            [1, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 0, 0, 0, 0, 3, 4, 2, 2, 1],
            [9, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 2, 4, 2, 1, 0, 0, 0, 1],
            [10, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [3, 2, 4, 2, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).


matrizC3([
            [3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 3, 4, 2, 3, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 1],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 4, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 3, 2, 2, 2, 2, 1],
            [9, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 4, 2, 1],
            [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 4, 2, 3, 4, 2, 2, 3, 4, 2, 2, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).


matrizC4([
            [3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 3, 2, 2, 2, 4, 2, 1],
            [1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 2, 0, 0, 3, 2, 2, 2, 1],
            [10, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 4, 2, 1],
            [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [3, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 2, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).


matrizD1([
          [9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [3, 2, 1, 0, 0, 0, 3, 2, 2, 2, 4, 2, 1],
          [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 5, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          [3, 2, 2, 2, 1, 0, 3, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 3, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 1],
          [3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 3, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 5, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]

        ]).

matrizD2([
          [9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
          [3, 2, 2, 2, 1, 0, 0, 3, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 5, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [3, 2, 2, 2, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 5, 0, 0, 5, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
          [3, 2, 2, 2, 1, 0, 0, 2, 3, 2, 2, 2, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 3, 2, 4, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
        ]).

matrizD3([
          [9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 11, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
          [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [3, 2, 2, 2, 1, 0, 0, 0, 3, 2, 2, 2, 1],
          [1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
          [3, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 2, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
          [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0]
          ]).

fazer_matrizes() :-
    remove_nodes_edges(),
    matrizA1(MatrizA1),
    converter_matriz(MatrizA1,a1),
    matrizA2(MatrizA2),
    converter_matriz(MatrizA2,a2),
    matrizB1(MatrizB1),
    converter_matriz(MatrizB1,b1),
    matrizB2(MatrizB2),
    converter_matriz(MatrizB2,b2),
    matrizB3(MatrizB3),
    converter_matriz(MatrizB3,b3),
    matrizC1(MatrizC1),
    converter_matriz(MatrizC1,c1),
    matrizC2(MatrizC2),
    converter_matriz(MatrizC2,c2),
    matrizC3(MatrizC3),
    converter_matriz(MatrizC3,c3),
    matrizC4(MatrizC4),
    converter_matriz(MatrizC4,c4),
    matrizD1(MatrizD1),
    converter_matriz(MatrizD1,d1),
    matrizD2(MatrizD2),
    converter_matriz(MatrizD2,d2),
    matrizD3(MatrizD3),
    converter_matriz(MatrizD3,d3).


% ConversÃ£o de cÃ©lulas de matriz para Nodes.
converter_matriz(Matriz,Floor) :-
    converter_matriz_aux(Matriz, 1, 0,Floor).

converter_matriz_aux([], _, _,_).
converter_matriz_aux([Linha|Resto], LinhaAtual, ID,Floor) :-
    converter_linha(Linha, LinhaAtual, 1, ID, ProximoID,Floor),
    ProximaLinha is LinhaAtual + 1,
    converter_matriz_aux(Resto, ProximaLinha, ProximoID,Floor).

% ConversÃ£o de cÃ©lulas de linha para Nodes.
converter_linha([], _, _, ID, ID,_).
converter_linha([Valor|Resto], Linha, Coluna, ID, ProximoID,Floor) :-
    atomic_concat(Floor, '(', TempID),
    atomic_concat(TempID, Coluna, TempID2),
    atomic_concat(TempID2, ',', TempID3),
    atomic_concat(TempID3, Linha, TempID4),
    atomic_concat(TempID4, ')', NovoIDAtom),
    term_to_atom(NovoID, NovoIDAtom),
    % write('NovoID: '), write(NovoID), nl,
    assertz(node(NovoID, Coluna, Linha, Valor, Floor)),
    %write(node(NovoID, Coluna, Linha, Valor, Floor)), nl,
    ProximaColuna is Coluna + 1,
    converter_linha(Resto, Linha, ProximaColuna, NovoID, ProximoID,Floor).

fazer_grafos() :-
    cria_grafo(23,11,a1),
    cria_grafo(23,11,a2),
    cria_grafo(25,13,b1),
    cria_grafo(25,13,b2),
    cria_grafo(25,13,b3),
    cria_grafo(13,21,c1),
    cria_grafo(13,21,c3),
    cria_grafo(13,21,d1),
    cria_grafo(13,21,d2),
    cria_grafo(13,21,d3).


cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Piso):-
  cria_grafo_lin(Col,Lin,Piso),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1,Piso).


cria_grafo_lin(0,_,_):-!.

cria_grafo_lin(Col,Lin,Piso):-
  ((corr_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  (elev_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  (sala(_, Col, Lin, Piso),%trace,
  node(Id1, Col, Lin, _, Piso))
  ;
  node(Id1,Col,Lin,0,Piso)),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id2, 1, Piso));true)), % Verifca Ã  direita.
  ((node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id3, 1, Piso));true)), % Verifca Ã  esquerda.
  ((node(Id4,Col,LinS,0,Piso), assertz(edge(Id1, Id4, 1, Piso));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA,0,Piso), assertz(edge(Id1, Id5, 1, Piso));true)), % Verifica acima.
  C is sqrt(2),
  ((node(Id6,ColS,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id6, C, Piso));true)), % LigaÃ§Ã£o Ã  diagonal superior direita.
  ((node(Id7,ColA,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id7, C, Piso));true)), % LigaÃ§Ã£o Ã  diagonal superior esquerda.
  ((node(Id8,ColS,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id8, C, Piso));true)), % LigaÃ§Ã£o Ã  diagonal inferior direita.
  ((node(Id9,ColA,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id9, C, Piso));true)), % LigaÃ§Ã£o Ã  diagonal inferior esquerda.

  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso),!.

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).

% Remove todos os factos "node" e "edge".
remove_nodes_edges() :-
    retractall(node(_, _, _, _, _)),
    retractall(edge(_, _, _, _)).


:- http_handler('/task_path', task_path, []).

% Cria o servidor HTTP
server(Port) :-
  http_server(http_dispatch, [port(Port)]).

% Calcula o caminho entre dois pisos, recebendo uma tarefa e devolvendo o caminho.
task_path(Request):-
  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),

  atom_string(Origem, Or),
  atom_string(Destino, Dest),

  % Busca pelas coordenadas e piso da origem e do destino atravÃ©s dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  melhor_caminho_pisos(PisoOr, PisoDest,Cam, PisosPer),
  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 tambÃ©m.
  edge(Y1, Y, _, PisoDest),

  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y),

  converte_cam_final(Cam, CamF),

  R = json([sol1=CamF, sol2=CamPorPiso]),
  prolog_to_json(R, JSONObject),

  reply_json(JSONObject, [json_object(dict)]).


% Calcula o caminho entre dois pisos, recebendo os dados diretamente e devolvendo o caminho.
caminho_final(Or,Dest):-
  % Busca pelas coordenadas e piso da origem e do destino atravÃ©s dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  melhor_caminho_pisos(PisoOr, PisoDest, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 tambÃ©m.
  edge(Y1, Y, _, PisoDest),

  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y),

  converte_cam_final(Cam, CamF),
    write('CamF: '), write(CamF), nl,
   % converte_CamPorPiso(CamF, CamPorPiso, CamPorPisoF),
    write('CamPorPiso: '), write(CamPorPiso), nl.


busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest):-
  ((sala(Or, COr, LOr, PisoOr);corr_pos(Or, COr, LOr, PisoOr);elev_pos(Or, COr, LOr, PisoOr)),
  (sala(Dest, CDest, LDest, PisoDest);corr_pos(Dest, CDest, LDest, PisoDest);elev_pos(Dest, CDest, LDest, PisoDest))).


converte_cam_final([], []).

converte_cam_final([elev(PO,PD)|T], [[PO,elev,PD]|T2]):-
  converte_cam_final(T, T2).

converte_cam_final([cor(PO,PD)|T], [[PO,cor,PD]|T2]):-
  converte_cam_final(T, T2).


%%%



% Vai aplicar o A-Star a cada um dos pisos da soluÃ§Ã£o de melhor_caminho_pisos ou caminho_pisos.
% 1Âº - Lista de pisos da soluÃ§Ã£o.
% 2Âº - Lista de listas contendo as soluÃ§Ãµes do A-Star para cada piso.
aStar_piso([PisoDest|[]], [UltCaminho|[]], [], Or, Dest):-
  aStar(Or, Dest, UltCaminho, _, PisoDest),
  !.

aStar_piso([PisoAct, PisoProx|ProxPisos], [[CamPiso]|Restante], [TravessiaEd|Travessias], IdInicial, Dest):-

  ((TravessiaEd == elev(PisoAct, PisoProx), elev_pos(_, Col, Lin, PisoAct), node(IdElev, Col, Lin, _, PisoAct),
  edge(IdElev, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), elev_pos(_, Col1, Lin1, PisoProx),
  node(IdElevProxPiso, Col1, Lin1, _, PisoProx), edge(IdElevProxPiso, IdInicialProxPiso, _, PisoProx),!)
  ;
  (TravessiaEd == cor(PisoAct, PisoProx), corr_pos(_, Col, Lin, PisoAct), node(IdCorr, Col, Lin, _, PisoAct),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), corr_pos(_, Col1, Lin1, PisoProx),
  node(IdCorrProxPiso, Col1, Lin1, _, PisoProx), edge(IdCorrProxPiso, IdInicialProxPiso, _, PisoProx))),

  append([PisoProx], ProxPisos, L),
  aStar_piso(L, Restante, Travessias, IdInicialProxPiso, Dest).



%%Algoritmos dados.
caminho_pisos(PisoOr, PisoDest, LEdCam, LLig, LPiCam):-
  pisos(EdOr, LPisosOr), member(PisoOr, LPisosOr),
  pisos(EdDest, LPisosDest), member(PisoDest, LPisosDest),
  caminho_edificios(EdOr, EdDest, LEdCam),
  %!, % Cut to prevent backtracking on the caminho_edificios/3 predicate
  segue_pisos(PisoOr, PisoDest, LEdCam, LLig, LPiCam2),
  append([PisoOr], LPiCam2, LPiCam).

segue_pisos(PisoDest, PisoDest, _, [], []).

segue_pisos(PisoDest1, PisoDest, [EdDest], [elev(PisoDest1, PisoDest)], [PisoDest | _]):-
  PisoDest \== PisoDest1,
  elevador(EdDest, LPisos), member(PisoDest1, LPisos), member(PisoDest, LPisos).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [cor(PisoAct, PisoSeg) | LOutrasLig], [PisoSeg | ListaPisos]):-
  (corredor(EdAct, EdSeg, PisoAct, PisoSeg); corredor(EdSeg, EdAct, PisoSeg, PisoAct)),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig, ListaPisos).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [elev(PisoAct, PisoAct1), cor(PisoAct1, PisoSeg) | LOutrasLig], [PisoAct1, PisoSeg | ListaPisos]):-
  (corredor(EdAct, EdSeg, PisoAct1, PisoSeg); corredor(EdSeg, EdAct, PisoSeg, PisoAct1)),
  PisoAct1 \== PisoAct,
  elevador(EdAct, LPisos), member(PisoAct, LPisos), member(PisoAct1, LPisos),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig, ListaPisos).
  %!. % Cut to prevent backtracking

caminho_edificios(EdOr, EdDest, LEdCam):-
  caminho_edificios2(EdOr, EdDest, [EdOr], LEdCam).
  %!. % Cut to prevent backtracking

caminho_edificios2(EdX, EdX, LEdInv, LEdCam):-
  !, reverse(LEdInv, LEdCam).

caminho_edificios2(EdAct, EdDest, LEdPassou, LEdCam):-
  (liga(EdAct, EdInt); liga(EdInt, EdAct)),
  \+member(EdInt, LEdPassou),
  caminho_edificios2(EdInt, EdDest, [EdInt | LEdPassou], LEdCam).
  %!. % Cut to prevent backtracking


% Algoritmo que vai retornar os caminhos com o critÃ©rio de preferÃªncia sem elevadores.
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor,LPiCam):-
findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig,LPiCam),LLLig),
menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).

menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
conta(LLig,NElev1,NCor1),
(((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
(NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.


% A-star.
aStar(Orig,Dest,Cam,Custo,Piso):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo,Piso).

% Se for preciso apenas o melhor caminho, colocar cut a seguir ao reverse.
aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
	reverse([Dest|T],Cam),!.

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Piso):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX,Piso),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX,Piso),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo,Piso).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa,Piso):-
	node(Nodo1,X1,Y1,_,Piso),
	node(Nodo2,X2,Y2,_,Piso),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).



%%%%%%%%%%%%%%%%%%%%%%%% SPRINT C
%%%%%%%%%%%%%%%%%%%%%%%% %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%




:- use_module(library(random)).
:- use_module(library(clpfd)).

:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic avaliacao_final/1.
:-dynamic tempo_limite/1.
:-dynamic tempo_inicio/1.
:-dynamic avaliacao_termino/1.
:-discontiguous avalia/2.
:-discontiguous avalia/3.


%tarefa(Id, TempoProcessamento, Tipo).
tarefa(t1,2, limpeza).
tarefa(t2,4, vigilancia).
tarefa(t3,11, entrega).
tarefa(t4,3, limpeza).
tarefa(t5,15, vigilancia).

tempo_transicao(t1, t2, 5).
tempo_transicao(t1, t3, 8).
tempo_transicao(t1, t4, 2).
tempo_transicao(t1, t5, 3).
tempo_transicao(t2, t3, 3).
tempo_transicao(t2, t4, 4).
tempo_transicao(t2, t5, 5).
tempo_transicao(t3, t4, 6).
tempo_transicao(t3, t5, 7).
tempo_transicao(t4, t5, 8).


% tarefas(NTarefas).
tarefas(5).

% parameteriza��o
inicializa:-
    write('Numero de novas Geracoes: '),read(NG),			(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100,
	(retract(prob_cruzamento(_));true),	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100,
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
	write('Avaliação Pretendida:'), read(AP),
	(retract(avaliacao_final(_));true), asserta(avaliacao_final(AP)),
	write('Tempo limite de execução:'), read(TL),
	(retract(tempo_limite(_));true), asserta(tempo_limite(TL)),
	get_time(Tempo),
	(retract(tempo_inicio(_));true), asserta(tempo_inicio(Tempo)).
gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa, tarefa(Tarefa, _, _), ListaTarefas),
	gera_populacao(TamPop, ListaTarefas, NumT, Pop).

gera_populacao(0, _, _, []):-!.

gera_populacao(TamPop, ListaTarefas, NumT, [Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1, ListaTarefas, NumT, Resto),
	gera_individuo(ListaTarefas, NumT, Ind),
	not(member(Ind, Resto)).

gera_populacao(TamPop, ListaTarefas, NumT, L):-
	gera_populacao(TamPop, ListaTarefas, NumT, L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq, V):-
	avalia(Seq, 0, V).

avalia([], _, 0).

avalia([T1, T2|Resto], Inst, V):-
	tempo_transicao(T1, T2, TempoTransicao),
	tarefa(T1, TempoExecucao, _),
	avalia([T2|Resto], Inst + TempoTransicao + TempoExecucao, VResto),
	V is Inst + TempoTransicao + TempoExecucao + VResto.


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


gera_geracao(G, G, Pop) :-
    !,
    write('Geração '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N, G, Pop) :-
    write('Geração '), write(N), write(':'), nl, write(Pop), nl,
    (verifica_termino(Pop, termino), termina(termino), ! ; true),
    (verifica_tempo_limite(Pop, termino), termina(termino), ! ; true),
    cruzamento(Pop, NPop1),
    mutacao(NPop1, NPop),
    avalia_populacao(NPop, PopulacaoAv),
    append(Pop,PopulacaoAv,PopJunta),
    list_to_set(PopJunta, PopulacaoSemRepetidos),
    ordena_populacao(PopulacaoSemRepetidos,PopOrdenada),
    melhores(PopOrdenada, Melhores),
    retira_melhores(PopOrdenada, Melhores, Restantes),
    liga_produto_avaliacao(Restantes, PopulacaoProduto),
    ordenar_populacao_por_produto(PopulacaoProduto,PopOrdenadaProduto),
    melhores_sobra(PopOrdenadaProduto, Pop, Melhores, MelhorProd),
    remove_produtos(MelhorProd, RMelhores),
    append(Melhores, RMelhores, PopNova),
    ordena_populacao(PopNova, PopNovaOrd),
    N1 is N + 1,
    gera_geracao(N1, G, PopNovaOrd).


remove_produtos([], []).
remove_produtos([Ind*A*_|Resto], [Ind*A|RestoSemProdutos]) :-
	remove_produtos(Resto, RestoSemProdutos).


melhores_sobra(PopOrdenadaProduto, Pop, Melhores, NovaPopulacao) :-
    length(Pop, N),
    length(Melhores, P),
    R is N - P,
	sublista2(PopOrdenadaProduto, 1, R, NovaPopulacao).


ordenar_populacao_por_produto(PopAv,PopAvOrd):-
	bsort2(PopAv,PopAvOrd).

bsort2([X],[X]):-!.
bsort2([X|Xs],Ys):-
    bsort2(Xs,Zs),
    btroca2([X|Zs],Ys).

btroca2([X],[X]):-!.

btroca2([X*VX*VI,Y*VY*VJ|L1],[Y*VY*VJ|L2]):-
    VI > VJ,!,
    btroca2([X*VX*VI|L1],L2).

btroca2([X|L1],[X|L2]):-btroca2(L1,L2).


liga_produto_avaliacao([], []).
liga_produto_avaliacao([Ind*V|Resto], [Ind*V*RMult|RestoComProduto]) :-
    random(0.0, 1.0, Random),
	RMult is V * Random,
    liga_produto_avaliacao(Resto, RestoComProduto).


retira_melhores(PopOrdenada, MelhoresPop, PopRestantes) :-
    subtract(PopOrdenada, MelhoresPop, PopRestantes).


melhores(PopOrdenada, Melhores) :-
    length(PopOrdenada, T),
    P1 is max(1, round(0.25 * T)),
    sublista2(PopOrdenada, 1, P1, Melhores).


verifica_tempo_limite(Pop, IndivAv) :-
    tempo_decorrido(TempoDecorrido),
    tempo_limite(Limite),
    TempoDecorrido >= Limite,!,
    select(IndivAv, Pop, _).

tempo_decorrido(TempoDecorrido) :-
    tempo_inicio(TempoInicio),
    get_time(TempoAtual),
    TempoDecorrido is TempoAtual - TempoInicio.


verifica_termino(Pop, Ind * Aval):-
    avaliacao_termino(Av),
    member(Ind * Aval, Pop),
    Aval =< Av.

termina(Ind):-
    write('Melhor Individuo: '), write(Ind), nl, halt.

avalia(Seq, V):-
    avalia(Seq, 0, V).

avalia([], _, 0).

avalia([T|Resto], Inst, V):-
    tarefa(T, Dur, _),
    InstFim is Inst + Dur,
    avalia(Resto, InstFim, VResto),
    V is InstFim + VResto.

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
          random_permutation(Ind1, RandInd1),random_permutation(Ind2, RandInd2),
        cruzar(RandInd1,RandInd2,P1,P2,NInd1),
	  cruzar(RandInd2,RandInd1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

sublista2(Lista, Inicio, Fim, Sublista) :-
    length(Lista, Tamanho),
    between(1, Tamanho, Inicio),
    between(Inicio, Tamanho, Fim),
    sublista_aux2(Lista, Inicio, Fim, Sublista).


sublista_aux2([], _, _, []).

sublista_aux2([H|T], Inicio, Fim, [H|Resto]) :-
    between(Inicio, Fim, Pos),
    PosInicio is Inicio,
    PosFim is Fim,
    Pos >= PosInicio,
    Pos =< PosFim,
    NovoInicio is Inicio + 1,
    sublista_aux2(T, NovoInicio, Fim, Resto).
sublista_aux2([_|T], Inicio, Fim, Sublista) :-
    NovoInicio is Inicio + 1,
    sublista_aux2(T, NovoInicio, Fim, Sublista).





































