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

%guardar (a,[a1,a2]) e (a)
%ou seja guarda o edificio e os seus pisos

request_edificios_pisos():-
    apagar_edificios_pisos(),
    http_open('http://localhost:3000/api/floors/getAlgavInfo', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    write(ResObj),
    criar_edificio(ResObj)
    criar_edificios_pisos(ResObj).

apagar_edificios_pisos():-
    findall(pisos(X,Y), pisos(X,Y), Pisos),
    apagar(Pisos).

criar_edificios_pisos([_,[]]).
criar_edificios_pisos([E,[Floors]|T]):-
    assertz(pisos(E,Floors)),
        criar_edificios_pisos(T).


%guardar (a,h,a1,h2) e (a,h)
%ou seja guarda a passagem entre dois pisos e liga os Edificios

request_tuneis():-
    apagar_tuneis(),
    http_open('http://localhost:3000/api/tunnels/getTunnelsAlgav', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON, ResObj),

    retira_tuneis(ResObj, ResVal),
      write(ResVal),

    criar_tunel(ResObj).
    criar_ligacao(ResVal).

apagar_tuneis():-
    findall(tuneis(X,Y,X1,Y1), tuneis(X,Y,X1,Y1), Tuneis),
    apagar(Tuneis).

retira_tuneis([], []).
retira_tuneis([H|T], [[H.building1, H.building2]| T2]):-
    retira_tuneis(T,T2).

criar_tunel([]).
criar_tunel([H|T]):-
    assertz(corredor(H)),
    criar_tunel(T).

criar_ligacao([]).
criar_ligacao([Building1, Building2|T]):-
    assertz(liga(Building1, Building2));
    criar_ligacao(T).


%guardar (a,[a1,a2])
%ou seja guarda o edificio e pisos servidos por elevador

request_elevador():-
    apagar_elevador(),
    http_open('http://localhost:3000/api/elevators', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    retira_elevador(ResObj,ResVal),
    write(ResVal),
    criar_elevador(ResVal).

apagar_elevador():-
    findall(elevador(X,Y), elevador(X,Y), Elevador),
    apagar(Elevador).

retira_elevador([], []).
retira_elevador([H|T], [(H.buildingId,H.floors)|L]):-
    retira_elevador(T,L).

criar_elevador([]).
criar_elevador([(Edificio, Floors)|T]):-
    assertz(elevador(Edificio, Floors)),
    criar_elevador(T).


%Dados Pisos
%guardar (a201,5,6,a2)
%ou seja guarda a sala, as coordenadas da porta e o piso

request_salas():-
    apagar_salas(),
    http_open('http://localhost:3000/api/classrooms/getClassroomsAlgav', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    write(ResObj),
    criar_salas(ResObj).

apagar_salas():-
    findall(sala(S,X,Y,P), sala(S,X,Y,P), Salas),
    apagar(Salas).

criar_salas([]).
criar_salas([H|T]):-
    assertz(sala(H)),
    criar_salas(T).

%guardar (a2b2,23,6,a2)
%ou seja guarda a posição do corredor no piso
request_tunel_location():-
    apagar_tunel_location(),
    http_open('http://localhost:3000/api/tunnels/getTunnelsAlgav2', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    write(ResObj),
    criar_tunel_location(ResObj).

apagar_tunel_location():-
    findall(corr_pos(T,X,Y,P), corr_pos(T,X,Y,P), Tunel_location),
    apagar(Tunel_location).

criar_tunel_location([]).
criar_tunel_location([H|T]):-
    assertz(corr_pos(H)),
    criar_tunel_location(T).

%guardar (ec1,1,14,c1)
%ou seja guarda as coordenadas do elevador e o respetivo piso

request_elevador_location():-
    apagar_elevador_location(),
    http_open('http://localhost:3000/api/elevators/getElevatorAlgav', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    write(ResObj),
    criar_elevador_location(ResObj).

apagar_elevador_location():-
    findall(elev_pos(E,X,Y,P), elev_pos(E,X,Y,P), Elevador_location),
    apagar(Elevador_location).

criar_elevador_location([]).
criar_elevador_location([H|T]):-
    assertz(elev_pos(H)),
    criar_elevador_location(T).

:- dynamic node/5.
:- dynamic m/4.
:- dynamic ligacel/3.
:- dynamic cel/2.
:- dynamic edge/4.
:-set_prolog_flag(answer_write_options,[max_depth(0)]).
:-set_prolog_flag(report_error,true).
:-set_prolog_flag(unknown,error).

request_mapa_piso():-
    apagar_mapa_piso(),
    http_open('http://localhost:3000/api/floors/getMapAlgav', ResJSON, [cert_verify_hook(cert_accept_any)]),
    json_read_dict(ResJSON,ResObj),
    retira_mapa_piso(ResObj,ResVal),
    write(ResVal),
    criar_mapa_piso(ResVal).

apagar_mapa_piso():-
    findall(converter_matriz(X,Y), converter_matriz(X,Y), Mapa_piso),
    apagar(Mapa_piso).

retira_mapa_piso([], []).
retira_mapa_piso([H|T], [(H.id,H.map)|L]):-
    retira_mapa_piso(T,L).

criar_mapa_piso([]).
criar_mapa_piso([(Map,Piso)|T]):-
    assertz(converter_matriz(Map,Piso)),
    criar_mapa_piso(T).


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



%Metodo apagar

apagar([]).
apagar([H|T]):-
   retract(H),
   apagar(T).















