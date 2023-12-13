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

%ligacão
liga(a,b).
liga(b,c).
liga(b,d).
liga(c,d).

%Dados Pisos
%salas
sala(auditorio,11,6,a1).

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
sala(b205,13,2,b3).
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

%posição corredores
corr_pos(a2b2,23,6,a2).
corr_pos(b2a2,1,6,b2).

corr_pos(b2c3,23,9,b2).
corr_pos(c3b2,1,10,c3).

corr_pos(b2d3,21,11,b2).
corr_pos(d3b2,11,1,d3).

corr_pos(c2d2,1,16,c2).
corr_pos(d2c2,13,2,d2).

corr_pos(c3d3,1,16,c3).
corr_pos(d3c3,13,2,d3).

corr_pos(b3c4,23,9,b3).
corr_pos(c4b3,1,10,c4).

%posição elevadores
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
:- dynamic m/4.
:- dynamic ligacel/3.
:- dynamic cel/2.
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
    converter_matriz(Matrizb3,b3),
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


% Convers�o de c�lulas da matriz para Nodes.
converter_matriz(Matriz,Floor) :-
    converter_matriz_aux(Matriz, 1, 0,Floor).

converter_matriz_aux([], _, _,_).
converter_matriz_aux([Linha|Resto], LinhaAtual, ID,Floor) :-
    converter_linha(Linha, LinhaAtual, 1, ID, ProximoID,Floor),
    ProximaLinha is LinhaAtual + 1,
    converter_matriz_aux(Resto, ProximaLinha, ProximoID,Floor).

% Convers�o de c�lulas da linha para Nodes.
converter_linha([], _, _, ID, ID,_).
converter_linha([Valor|Resto], Linha, Coluna, ID, ProximoID,Floor) :-
    atomic_concat(Floor, '(', TempID),
    atomic_concat(TempID, Coluna, TempID2),
    atomic_concat(TempID2, ',', TempID3),
    atomic_concat(TempID3, Linha, TempID4),
    atomic_concat(TempID4, ')', NovoIDAtom),
    term_to_atom(NovoID, NovoIDAtom),
     write('NovoID: '), write(NovoID), nl,
    assertz(node(NovoID, Coluna, Linha, Valor, Floor)),
    write(node(NovoID, Coluna, Linha, Valor, Floor)), nl,
    ProximaColuna is Coluna + 1,
    converter_linha(Resto, Linha, ProximaColuna, NovoID, ProximoID,Floor).

fazer_grafos() :-
    cria_grafo(23,11,a1),
    cria_grafo(23,11,a2),
    cria_grafo(23,11,b1),
    cria_grafo(23,11,b2),
    cria_grafo(23,11,b3),
    cria_grafo(13,21,c1),
    cria_grafo(13,21,c2),
    cria_grafo(13,21,c3),
    cria_grafo(13,21,c4),
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
  ((node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id2, 1, Piso));true)), % Verifca � direita.
  ((node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id3, 1, Piso));true)), % Verifca � esquerda.
  ((node(Id4,Col,LinS,0,Piso), assertz(edge(Id1, Id4, 1, Piso));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA,0,Piso), assertz(edge(Id1, Id5, 1, Piso));true)), % Verifica acima.
  C is sqrt(2),
  ((node(Id6,ColS,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id6, C, Piso));true)), % Liga��o � diagonal superior direita.
  ((node(Id7,ColA,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id7, C, Piso));true)), % Liga��o � diagonal superior esquerda.
  ((node(Id8,ColS,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id8, C, Piso));true)), % Liga��o � diagonal inferior direita.
  ((node(Id9,ColA,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id9, C, Piso));true)), % Liga��o � diagonal inferior esquerda.

  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso),!.

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).

% Remove todos os factos "node" e "edge".
remove_nodes_edges() :-
    retractall(node(_, _, _, _, _)),
    retractall(edge(_, _, _, _)).


% Relaciona o pedido HTTP a um predicado
:- http_handler('/Caminho_entre_edificios', caminho_entre_edificios, []).
:- http_handler('/caminho_final', caminho_final, []).

% Cria o servidor HTTP
server(Port) :-
  http_server(http_dispatch, [port(Port)]).

 caminho_final(Request):-
  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),


% Calcula o caminho entre dois pisos
caminho_entre_edificios(Request):-
  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),

  atom_string(Origem, Or),
  atom_string(Destino, Dest),

  % Busca pelas coordenadas e piso da origem e do destino atrav�s dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  melhor_caminho_pisos(PisoOr, PisoDest,Cam, PisosPer),
  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 tamb�m.
  edge(Y1, Y, _, PisoDest),

  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y),

  converte_cam_final(Cam, CamF),

  R = json([sol1=CamF, sol2=CamPorPiso]),
  prolog_to_json(R, JSONObject),

  reply_json(JSONObject, [json_object(dict)]).


% Calcula o caminho entre dois pisos
caminho_final(Or,Dest):-
  % Busca pelas coordenadas e piso da origem e do destino atrav�s dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  melhor_caminho_pisos(PisoOr, PisoDest, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest),   edge(Y1, Y, _, PisoDest),

  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X, Y),

  converte_cam_final(Cam, CamF),
    write('CamF: '), write(CamF), nl,

    write('CamPorPiso: '), write(CamPorPiso), nl.

  % CamF tem piso1, cor/elev, piso2
  % CamPorPiso tem os IDs que precisam de ser convertidos para as coordenadas.
  % CamPorPiso = [[10,20,2,421,56,25,15,21,51...][4,21,42,...]], uma array de ids para cada piso~
  % converte_CamPorPiso(CamF, CamPorPiso, CamPorPisoF).
  converte_CamPorPiso([], [[]|_], []).
  converte_CamPorPiso([[_,_,_]|T], [], []):- converte_CamPorPiso(T, [], []).
  converte_CamPorPiso([[PO,_,_]|_], [ID|T1], [IDF|T2]):-
    node(ID, Col, Lin, _, Piso),
    IDF = [Col, Lin, Piso],
    converte_CamPorPiso([[PO,_,_]|_], T1, T2).


busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest):-
  ((sala(Or, COr, LOr, PisoOr);corr_pos(Or, COr, LOr, PisoOr);elev_pos(Or, COr, LOr, PisoOr)),
  (sala(Dest, CDest, LDest, PisoDest);corr_pos(Dest, CDest, LDest, PisoDest);elev_pos(Dest, CDest, LDest, PisoDest))).

converte_cam_final([], []).

converte_cam_final([elev(PO,PD)|T], [[PO,elev,PD]|T2]):-
  converte_cam_final(T, T2).

converte_cam_final([cor(PO,PD)|T], [[PO,cor,PD]|T2]):-
  converte_cam_final(T, T2).

remove_double_quotes([], []).
remove_double_quotes([H|T], [H1|T1]) :-
    atomic(H),
    atom_chars(H, Chars),
    exclude(=( '"'), Chars, CharsWithoutQuotes),
    atomic_list_concat(CharsWithoutQuotes, H1),
    atom(H1),
    remove_double_quotes(T, T1).

remove_double_quotes([H|T], [H1|T1]) :-
    compound(H),
    H =.. [F|Args],
    remove_double_quotes(Args, ArgsWithoutQuotes),
    H1 =.. [F|ArgsWithoutQuotes],
    remove_double_quotes(T, T1).

remove_double_quotes([H|T], Result) :-
    \+ (atomic(H); compound(H)),
    remove_double_quotes(T, Result).


remove_quotes([], []).
remove_quotes([cor(A,B)|T1], [cor(A1,B1)|T0]) :-
  atom_chars(A, [O,T|_]),
  atom_chars(B, [O2,T2|_]),
  atom_concat(O, T, A1),
  atom_concat(O2, T2, B1),
  remove_quotes(T1, T0).
remove_quotes([elev(C,D)|T1], [elev(C1,D1)|T0]) :-
  atom_chars(C, [O,T|_]),
  atom_chars(D, [O2,T2|_]),
  atom_concat(O, T, C1),
  atom_concat(O2, T2, D1),
  remove_quotes(T1, T0).

extrai_request(Data, [Data.origem, Data.posOrigem, Data.destino, Data.posDestino|[]]).

define_dados([PO, [ColOr, LinOr], PD, [ColDest, LinDest]], PO, ColOr, LinOr, PD, ColDest, LinDest).


% Vai aplicar o A-Star a cada um dos pisos da solu��o de melhor_caminho_pisos ou caminho_pisos.
% 1� - Lista de pisos da solu��o.
% 2� - Lista de listas contendo as solu��es do A-Star para cada piso.
aStar_piso([PisoDest|[]], [UltCaminho|[]], [], Or, Dest):-
  aStar(Or, Dest, UltCaminho, _, PisoDest),
  !.

aStar_piso([PisoAct, PisoProx|ProxPisos], [[CamPiso]|Restante], [TravessiaEd|Travessias], IdInicial, Dest):-

  ((TravessiaEd == elev(PisoAct, PisoProx), elev_pos(_, Col, Lin, PisoAct), node(_, Col, Lin, _, PisoAct),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), elev_pos(_, Col1, Lin1, PisoProx),
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


% Algoritmo que vai retornar os caminhos com o crit�rio de prefer�ncia sem elevadores.

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor,LPiCam):-
findall(_,caminho_pisos(PisoOr,PisoDest,_,_,LPiCam),LLLig),
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



% Predicados para fazer a liga��o entre Prolog e a base de dados do
% projeto integrador.
%Cria�ao de servidor HTTP no porto 'Port'

%server(Port):-
 %http_server(http_dispatch, [port(Port)]).

%Fazer GET para os tuneis

%request_tuneis():-
 %   apagar_tuneis(),
  %  http_open('http://localhost:3000/api/tunnels', ResJSON, [cert_verify_hook(cert_accept_any)]),
 %   json_read_dict(ResJSON, ResObj),

  %  retira_tuneis(ResObj, ResVal),
   %   write(ResVal),

    %criar_tuneis(ResVal).

%apagar_tuneis():-
 %   findall(tuneis(X,Y), tuneis(X,Y), Tuneis),
  %  apagar(Tuneis).

%retira_tuneis([], []).
%retira_tuneis([H|T], [[H.floor1Id, H.floor2Id]| T2]):-
 %   retira_tuneis(T,T2).

%criar_tuneis([]).
%criar_tuneis([[Floor1, Floor2|_]|T]):-
 %   assertz(tuneis(Floor1, Floor2));
  %  criar_tuneis(T).

%Fazer GET para todos os pisos do edificios

%request_andares_por_edificios(Edificio):-

%    string_concat('http://localhost:3000/api/floors/', Edificio, URL),
 %   http_open(URL, ResJSON, [cert_verify_hook(cert_accept_any)]),
  %  json_read_dict(ResJSON,ResObj),
   % retira_pisos2(ResObj,ResVal),
    %writeln(Edificio), write(ResVal),
    %criar_pisos2(Edificio,ResVal).

%retira_pisos2([], []).
%retira_pisos2([H|T], [H.floorNumber|L]):-
 %   retira_pisos2(T,L).

%criar_pisos2(_,[]).
%criar_pisos2(E,[Floors|T]):-
 %   assertz(edificio_piso(E,Floors)),
  %      criar_pisos2(E,T).


%Fazer GET para os pisos

%request_pisos():-
 %   apagar_pisos(),
  %  http_open('http://localhost:3000/api/floors', ResJSON, [cert_verify_hook(cert_accept_any)]),
 %   json_read_dict(ResJSON, ResObj),
  %  retira_pisos(ResObj, ResVal),
   % write(ResVal),
    %criar_pisos(ResVal).

%apagar_pisos():-
 %   findall(pisos(X), pisos(X), Pisos),
  %  apagar(Pisos).
%retira_pisos([], []).
%retira_pisos([H|T], [(H.buildingId,H.map)|L]):-
 %   retira_pisos(T,L).

%criar_pisos([]).
%criar_pisos([(Edificio,Map)|T]):-
 %   assertz(pisos(Edificio,Map)),
  %  criar_pisos(T).

%Fazer GET para os edificios

%request_edificios():-

 %   apagar_edificios(),
  %  http_open('http://localhost:3000/api/buildings/list', ResJSON, [cert_verify_hook(cert_accept_any)]),
   % json_read_dict(ResJSON, ResObj),
    %retira_edificios(ResObj, ResVal),
    %write(ResVal),
    %criar_edificio(ResVal).

%apagar_edificios():-
 %   findall(edificio(X,Y), edificio(X,Y), Edificios),
  %  apagar(Edificios).

%retira_edificios([],[]).
% retira_edificios([H|T], [(H.id,request_andares_por_edificios(H.id))|L]):-
  %  retira_edificios(T,L).

%criar_edificio([]).
%criar_edificio([(Code, Pisos)|T]):-
 %   assertz(edificio(Code,Pisos)),
  %  criar_edificio(T).

%Fazer GET para os elevadores

%request_elevadores():-
 %   apagar_elevadores(),
  %  http_open('http://localhost:3000/api/elevators', ResJSON, [cert_verify_hook(cert_accept_any)]),
  %  json_read_dict(ResJSON, ResObj),
   % retira_elevadores(ResObj, ResVal),
   % write(ResVal),

    %criar_elevadores(ResVal).

%apagar_elevadores():-
 %   findall(elevador(X,Y), elevador(X,Y), Elevador),
  %  apagar(Elevador).

%retira_elevadores([], []).
%retira_elevadores([H|T], [[H.buildingId,H.floors]|T2]):-
  %  retira_elevadores(T,T2).

%criar_elevadores([]).
%criar_elevadores([[Edificio, PisosServidos|_]|T]):-
 %   assertz(elevador(Edificio, PisosServidos)),
  %  criar_elevadores(T).

%Metodo apagar

%apagar([]).
%apagar([H|T]):-
 %   retract(H),
  %  apagar(T).















